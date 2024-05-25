import { Request, Response } from "express";
import userAuthUsecase from '../../../app/usecases/users/userAuthUsecase'
import sendVerifyMail from "../../../infrastructure/email/emailService"
import { generateOtp } from "../../../utils/otpGeneratorFun"
import { validateOtp } from "../../../utils/otpValidation"
import { cleanupSessionData } from "../../../utils/sessionCleanUp"
import { expiryCheck } from "../../../utils/otpExpireCheck";

export default {
    registerUser: async (req: Request, res: Response) => {
        try {
            const { email, userName } = req.body
            console.log(email, userName)
            const user = await userAuthUsecase.registerUser(req.body)
            if (user) {
                const otp = generateOtp()
                const sessionData = req.session!;
                sessionData.otp = otp;
                sessionData.otpGeneratedTime = Date.now();
                sendVerifyMail(req, userName, email)
            }
            res.status(200).json({ message: "User registered successfully", user });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
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
            const { user, token } = await userAuthUsecase.verifyUser(email)
            console.log(user)
            console.log(token)
            res.status(200).json({ message: 'OTP verified', user, token })
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
            const { user, token } = await userAuthUsecase.loginUser(email, password)
            console.log({ user })
            res.status(200).json({
                message: 'login successfull!',
                user, token
            })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    googleAuth: async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const user = await userAuthUsecase.googleAuthUseCase(req.body)
            res.status(200).json({ message: "User registered successfully", user: user?.user, token: user?.token });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    updateProfile: async (req: Request, res: Response) => {
        console.log(req.body)
        try {
            const updatedUser = await userAuthUsecase.updateProfileUseCase(req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }

    },
    getUserDetails: async (req: Request, res: Response) => {
        try {
            console.log('inside getUserdetails')
            const userId = req.query.id
            if (typeof userId !== 'string') {
                res.status(400).json({ error: 'Invalid user ID' });
                return;
              }
          
            const userDetails = await userAuthUsecase.getUserDetails({ id: userId });
            res.json(userDetails)

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }



}
