import { Request } from "express";

export const validateOtp = (req: Request): boolean => {
    const sessionData = req.session!;
    console.log(sessionData)
        // Check if OTP has expired
        // const otpGeneratedTime = sessionData.otpGeneratedTime;
        // const curr = Date.now();
        // const otpExpTime = 60 * 1000; // 1 minute in milliseconds
        // if (curr - otpGeneratedTime! > otpExpTime) {
        //     console.log('inside time check')
        //     throw new Error('Otp expired');
        // }
    return Boolean(sessionData.otp && sessionData.otp === req.body.otp);
};