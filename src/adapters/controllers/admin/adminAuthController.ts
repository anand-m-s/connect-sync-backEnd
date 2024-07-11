import { NextFunction, Request, Response } from "express";
import adminAuthUseCase from "../../../app/usecases/admin/adminAuthUseCase";
import { generateToken } from "../../../app/utils/generateToken";
import jwt from 'jsonwebtoken';

export default {
    registerAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await adminAuthUseCase.registerAdmin(req.body))
        } catch (error) {
            next(error)
        }
    },
    loginAdmin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body          
            const result = await adminAuthUseCase.adminLogin(email, password)
            res.cookie('refreshToken',result.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.json(result)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: "Refresh token not provided" });
            }
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string, role: string };         
            const { token: newAccessToken, refreshToken: newRefreshToken } = generateToken(decoded.userId, 'admin');
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.json({ accessToken: newAccessToken })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    
}