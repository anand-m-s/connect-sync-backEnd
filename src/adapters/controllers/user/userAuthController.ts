import { NextFunction, Request, Response } from "express";
import userAuthUsecase from '../../../app/usecases/users/userAuthUsecase'
import sendVerifyMail from "../../../infrastructure/email/emailService"
import { generateOtp } from "../../../utils/otpGeneratorFun"
import { validateOtp } from "../../../utils/otpValidation"
import { cleanupSessionData } from "../../../utils/sessionCleanUp"
import { expiryCheck } from "../../../utils/otpExpireCheck";
import jwt from 'jsonwebtoken';
import { generateToken } from "../../../app/utils/generateToken";
import { verifiedTagInterface } from "../../../types/user/userRegisterInterface";

export default {
    registerUser: async (req: Request, res: Response,next:NextFunction) => {
        try {
            const { email, userName } = req.body           
            const user = await userAuthUsecase.registerUser(req.body)
            if (user) {
                const otp = generateOtp()
                const sessionData = req.session!;
                sessionData.otp = otp;
                sessionData.otpGeneratedTime = Date.now();
                sendVerifyMail(req, userName, email)
            }
            res.status(200).json({ message: "User registered please verify otp now", user });
        } catch (error) {        
            next(error);
        }
    },
    verifyOtp: async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            if (!validateOtp(req)) {
                throw new Error('Invalid Otp')
            }
            expiryCheck(req)
            cleanupSessionData(req)
            const { user, accessToken, refreshToken } = await userAuthUsecase.verifyUser(email)
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).json({ message: 'OTP verified', user, accessToken })
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    resendOtp: async (req: Request, res: Response) => {
        try {
            const { email, userName } = req.body
            cleanupSessionData(req)
            const otp = generateOtp()
            const sessionData = req.session!;
            sessionData.otp = otp;
            sessionData.otpGeneratedTime = Date.now();
            sendVerifyMail(req, userName, email)
            res.status(200).json({ message: 'Otp resend' })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })

        }
    },
    loginUser: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const { user, accessToken, refreshToken } = await userAuthUsecase.loginUser(email, password)
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).json({
                message: 'login successfull!',
                user, accessToken
            })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    googleAuth: async (req: Request, res: Response) => {
        try {
            const user = await userAuthUsecase.googleAuthUseCase(req.body)
            // console.log(user!)
            res.cookie('refreshToken', user?.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.status(200).json({ message: "User registered successfully", user: user?.user, accessToken: user?.accessToken });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    forgotPassword: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const data: any = await userAuthUsecase.forgotPassword(email);
            if (data.email) {
                cleanupSessionData(req)
                const otp = generateOtp()
                const sessionData = req.session!;
                sessionData.otp = otp;
                sessionData.otpGeneratedTime = Date.now();
                await sendVerifyMail(req, data.userName, data.email);
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    updatePassword: async (req: Request, res: Response) => {
        try {
            const { newPassword, email } = req.body
            console.log(email, newPassword)
            res.status(200).json(await userAuthUsecase.updatePassword(newPassword, email))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: "Refresh token not provided" });
            }
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string, role: string };
            const { token: newAccessToken, refreshToken: newRefreshToken } = generateToken(decoded.userId, 'user');
            res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
            res.json({ accessToken: newAccessToken })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    verifiedTag: async (req: Request, res: Response) => {
        try {       
            const userId = req.user.userId
            const data:verifiedTagInterface = req.body
            await userAuthUsecase.verifyTagUseCase(data,userId)
            res.json({ message: "Verified tag updated successfully" });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
