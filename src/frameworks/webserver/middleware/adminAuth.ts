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
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized Invalid token")
        }
    } else {
        res.status(401)
        throw new Error('Not authorized no token')
    }
}