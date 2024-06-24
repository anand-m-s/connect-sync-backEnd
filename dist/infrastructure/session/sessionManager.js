"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionManager = void 0;
const createSessionManager = (req) => ({
    setOtp: (otp) => {
        req.session.otp = otp;
    },
    setOtpGeneratedTime: (time) => {
        req.session.otpGeneratedTime = time;
    }
});
exports.createSessionManager = createSessionManager;
