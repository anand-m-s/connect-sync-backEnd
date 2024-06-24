"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userAuthUsecase_1 = __importDefault(require("../../../app/usecases/users/userAuthUsecase"));
const emailService_1 = __importDefault(require("../../../infrastructure/email/emailService"));
const otpGeneratorFun_1 = require("../../../utils/otpGeneratorFun");
const otpValidation_1 = require("../../../utils/otpValidation");
const sessionCleanUp_1 = require("../../../utils/sessionCleanUp");
const otpExpireCheck_1 = require("../../../utils/otpExpireCheck");
exports.default = {
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, userName } = req.body;
            console.log(email, userName);
            const user = yield userAuthUsecase_1.default.registerUser(req.body);
            if (user) {
                const otp = (0, otpGeneratorFun_1.generateOtp)();
                const sessionData = req.session;
                sessionData.otp = otp;
                sessionData.otpGeneratedTime = Date.now();
                (0, emailService_1.default)(req, userName, email);
            }
            res.status(200).json({ message: "User registered please verify otp now", user });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    verifyOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            if (!(0, otpValidation_1.validateOtp)(req)) {
                throw new Error('Invalid Otp');
            }
            (0, otpExpireCheck_1.expiryCheck)(req);
            (0, sessionCleanUp_1.cleanupSessionData)(req);
            const { user, token } = yield userAuthUsecase_1.default.verifyUser(email);
            res.status(200).json({ message: 'OTP verified', user, token });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    resendOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, userName } = req.body;
            (0, sessionCleanUp_1.cleanupSessionData)(req);
            const otp = (0, otpGeneratorFun_1.generateOtp)();
            const sessionData = req.session;
            sessionData.otp = otp;
            sessionData.otpGeneratedTime = Date.now();
            (0, emailService_1.default)(req, userName, email);
            res.status(200).json({ message: 'Otp resend' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const { user, token } = yield userAuthUsecase_1.default.loginUser(email, password);
            console.log({ user });
            res.status(200).json({
                message: 'login successfull!',
                user, token
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    googleAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const user = yield userAuthUsecase_1.default.googleAuthUseCase(req.body);
            res.status(200).json({ message: "User registered successfully", user: user === null || user === void 0 ? void 0 : user.user, token: user === null || user === void 0 ? void 0 : user.token });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    forgotPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const data = yield userAuthUsecase_1.default.forgotPassword(email);
            if (data.email) {
                (0, sessionCleanUp_1.cleanupSessionData)(req);
                const otp = (0, otpGeneratorFun_1.generateOtp)();
                const sessionData = req.session;
                sessionData.otp = otp;
                sessionData.otpGeneratedTime = Date.now();
                yield (0, emailService_1.default)(req, data.userName, data.email);
            }
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updatePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { newPassword, email } = req.body;
            console.log(email, newPassword);
            res.status(200).json(yield userAuthUsecase_1.default.updatePassword(newPassword, email));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};
