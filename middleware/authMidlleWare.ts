import { type NextFunction, type Request, type Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret: string = process.env.JWT_SECRET as string;

declare module 'express-serve-static-core' {
    interface Request {
        email?: string;
    }
}

export const generateToken = (email: string) => jwt.sign({ email: email }, secret, { expiresIn: '2h' })


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({ error: 'Access denied, token missing or invalid format' });
        return
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.email = decoded.email;
        next();
    } catch (error) {
        res.status(401).json({ error: `Invalid token: ${error}` });
    }
};





export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


export const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,14}$)/;
    return passwordRegex.test(password)
}

