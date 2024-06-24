"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiryCheck = void 0;
const expiryCheck = (req) => {
    const sessionData = req.session;
    console.log(sessionData);
    // Check if OTP has expired
    const otpGeneratedTime = sessionData.otpGeneratedTime;
    const curr = Date.now();
    const otpExpTime = 60 * 1000; // 1 minute in milliseconds
    if (curr - otpGeneratedTime > otpExpTime) {
        console.log('inside time check');
        throw new Error('Otp expired');
    }
};
exports.expiryCheck = expiryCheck;
