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
exports.forgotPassword = exports.verifyUser = void 0;
const user_1 = __importDefault(require("../../models/user"));
const connections_1 = __importDefault(require("../../models/connections"));
const verifyUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email);
        const updatedUser = yield user_1.default.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        const user = {
            id: updatedUser.id,
            email: updatedUser.email,
            userName: updatedUser.userName
        };
        yield connections_1.default.create({
            userId: updatedUser.id
        });
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.verifyUser = verifyUser;
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: email });
        if (!user) {
            return { message: 'User does not exist' };
        }
        if (user.isGoogle) {
            return { message: 'User logged in via Google' };
        }
        return {
            email: user.email,
            userName: user.userName,
            message: 'Verify OTP now',
        };
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.forgotPassword = forgotPassword;
