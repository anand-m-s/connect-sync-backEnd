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
const userRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/userRepoMongoDb");
const isVerified_1 = require("../../../frameworks/database/mongodb/repositories/user/isVerified");
const emailService_1 = __importDefault(require("../../../infrastructure/email/emailService"));
const otpGeneratorFun_1 = require("../../../utils/otpGeneratorFun");
const otpValidation_1 = require("../../../utils/otpValidation");
const sessionCleanUp_1 = require("../../../utils/sessionCleanUp");
const generateToken_1 = require("../../utils/generateToken");
const getUser_1 = require("../../../frameworks/database/mongodb/repositories/user/getUser");
exports.default = {
    registerUser: (data, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userName, email } = req.body;
            const savedUser = yield (0, userRepoMongoDb_1.saveUser)(data);
            if (savedUser) {
                const otp = (0, otpGeneratorFun_1.generateOtp)();
                const sessionData = req.session;
                sessionData.otp = otp;
                sessionData.otpGeneratedTime = Date.now();
                (0, emailService_1.default)(req, userName, email);
            }
            else {
                throw new Error("Failed to register user");
            }
            const user = {
                id: savedUser.id,
                email: savedUser.email,
                userName: savedUser.userName
            };
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    verifyUser: (email, req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!(0, otpValidation_1.validateOtp)(req)) {
                throw new Error('Invalid Otp');
            }
            (0, sessionCleanUp_1.cleanupSessionData)(req);
            const user = yield (0, isVerified_1.verifyUser)(email);
            console.log(user);
            let token = (0, generateToken_1.generateToken)(user.id);
            return { user, token };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    loginUser: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield getUser_1.getUser.getUserByEmail(email);
            console.log({ existingUser });
            let token;
            let user;
            if (existingUser && (yield existingUser.matchPassword(password))) {
                token = (0, generateToken_1.generateToken)(existingUser.id);
                user = {
                    id: existingUser.id,
                    userName: existingUser.userName,
                    email: existingUser.email
                };
            }
            return { user, token };
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
