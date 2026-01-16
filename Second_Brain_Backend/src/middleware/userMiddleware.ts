import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "sdfjdslkfjdskfjdsklfjds";

export const userMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
    const header = req.headers["authorization"];

    const decoded = jwt.verify(header as string, JWT_SECRET) as { userId: number };

    if(decoded) {
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}