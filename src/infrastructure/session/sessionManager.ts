import { SessionManager } from "../../types/user/sessionManager";
import { Request } from "express";
export const createSessionManager = (req: Request): SessionManager => ({
    setOtp: (otp: string) => {
        req.session.otp = otp;
    },
    setOtpGeneratedTime: (time: number) => {
        req.session.otpGeneratedTime = time;
    }
});
