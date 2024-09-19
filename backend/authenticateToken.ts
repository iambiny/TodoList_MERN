import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type UserPayLoadType = {
    userId?: string,
    name?: string
}

// Verify user (Check tokens is valid or not vaild)
async function authenticate(req: Request & { user?: UserPayLoadType }, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
        return res.send({ message: 'Unauthorized' });
    }
    jwt.verify(token, 'jwt-secret-key', (err: unknown, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = decoded;
        next();
    })
}

export default authenticate;