import express from "express";
import jwt from "jsonwebtoken";
import { User } from"./models/index.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UniqueConstraintError } from "sequelize";
import { userMiddleware } from "./middleware/userMiddleware.js";
import { Content } from "./models/content.js";
import crypto from "crypto";
import cors from "cors";

import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // EXACT frontend URL
    credentials: true
}));
const JWT_SECRET = "sdfjdslkfjdskfjdsklfjds";

const signupSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(10, "Username must be at most 10 characters")
        .regex(/^[A-Za-z]+$/, "Username must contain only letters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be at most 20 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase character")
        .regex(/[a-z]/, "Password must contain at least one lowercase character")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        )
})

app.post("/api/v1/signup", async (req, res) => {
    try {
        const result = signupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
            message: "Validation failed",
            errors: result.error.flatten().fieldErrors,
        });
        }

        const { username, password } = result.data;
        
        const hashPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            username,
            password: hashPassword
        });

        return res.status(200).json({
            message: "User created successfully"
        })

    } catch(error: unknown) {
        if(error instanceof UniqueConstraintError) {
            return res.status(403).json({
                message: "User already exists with this username"
            })
        }

        if(error instanceof Error) {
            return res.status(411).json({
                message: error.message
            })
        }
    }
});


const signinSchema = z.object({
    username: z.string(),
    password: z.string(),
});

app.post("/api/v1/signin", async (req, res) => {
    try {
        const result = await signinSchema.safeParse(req.body);

        if(!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
        }

        const { username, password } = result.data;

        const existingUser = await User.findOne({
            where: { username },
        });

        if(!existingUser) {
            return res.status(403).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );

        if(!isPasswordValid) {
            return res.status(403).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            { userId: existingUser.id },
            JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Signin successful"
        })
    } catch(error) {
        if(error instanceof Error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
});

app.put("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const { link, type, title, tags } = req.body;

        await Content.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: tags,
        })

        return res.status(200).json({
            message: "Content added"
        })
    } catch(error) {
        if(error instanceof Error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const content = await Content.findAll({
            where: { userId: userId },
        })

        return res.status(200).json({
            content,
        })
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const contentId = req.body.contentId;

        const deleteCount = await Content.destroy({
            where: { 
                id: contentId,
                userId: req.userId
            }
        });

        if(deleteCount === 0) {
            return res.status(403).json({
                message: "You are not allowed to delete this content"
            })
        }

        res.status(200).json({
            message: "Deleted successfully",
        })
    } catch(error) {
        if(error instanceof Error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if(!user.shareToken) {
            user.shareToken = crypto.randomUUID();
        }
        user.share = true;
        await user.save();

        return res.status(200).json({
            share: true,
            link: `http://localhost:3002/api/v1/brain/${user.shareToken}`
        })

    } catch(error) {
        if(error instanceof Error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
})

app.get("/api/v1/brain/:shareToken", async (req, res) => {
    try {
        const { shareToken } = req.params;

        const user = await User.findOne({
            where:{
                shareToken,
                share: true
            }
        })

        if(!user) {
            return res.status(404).json({
                message: "Brain not shared or invalid link"
            })
        }

        const content = await Content.findAll({
            where: { userId: user.id }
        })

        return res.status(200).json({
            username: user.username,
            content
        })

    } catch(error) {
        if(error instanceof Error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
})

app.listen(3002);