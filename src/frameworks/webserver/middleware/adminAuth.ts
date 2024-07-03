import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'



declare module 'express-serve-static-core' {
    interface Request {
        admin?: any;
    }
}
export const protectAdmin = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization")
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!)
            req.admin = decoded          
            if (req.admin.role == 'admin') {
                next()
            } else {
                res.status(403).json({ message: 'Forbidden: Admins only' });
            }
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized Invalid token")
        }
    } else {
        res.status(401)
        throw new Error('Not authorized no token')
    }
}