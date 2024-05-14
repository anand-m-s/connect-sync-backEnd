"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupSessionData = void 0;
const cleanupSessionData = (req) => {
    const sessionData = req.session;
    delete sessionData.otp;
    delete sessionData.otpGeneratedTime;
};
exports.cleanupSessionData = cleanupSessionData;
