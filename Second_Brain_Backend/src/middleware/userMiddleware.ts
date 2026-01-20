import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "sdfjdslkfjdskfjdsklfjds";

export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token; // ✅ READ FROM COOKIE

    if (!token) {
        return res.status(401).json({
            message: "You are not logged in"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};
