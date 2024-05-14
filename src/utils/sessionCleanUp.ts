import { Request } from "express";

export const cleanupSessionData = (req: Request) => {
    const sessionData = req.session!;
    delete sessionData.otp;
    delete sessionData.otpGeneratedTime;
    
};