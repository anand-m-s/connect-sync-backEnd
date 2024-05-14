"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOtp = void 0;
const validateOtp = (req) => {
    const sessionData = req.session;
    return Boolean(sessionData.otp && sessionData.otp === req.body.otp);
};
exports.validateOtp = validateOtp;
