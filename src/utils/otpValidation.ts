import { Request } from "express";

export const validateOtp = (req: Request): boolean => {
    const sessionData = req.session!;
    return Boolean(sessionData.otp && sessionData.otp === req.body.otp);
};