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
exports.updatePassword = exports.saveUserGoogle = exports.saveUser = void 0;
const user_1 = __importDefault(require("../../models/user"));
const userChecker_1 = require("../../utils/userChecker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const connections_1 = __importDefault(require("../../models/connections"));
const saveUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, userChecker_1.checkExistingUser)(data.email, data.userName);
        if (existingUser === null || existingUser === void 0 ? void 0 : existingUser.isVerified) {
            // Handle the case where the user already exists
            // You might want to throw an error or return a specific message
            throw new Error("A user with that email or username already exists.");
        }
        if (existingUser && !existingUser.isVerified) {
            let verifyUser = {
                _id: existingUser === null || existingUser === void 0 ? void 0 : existingUser.id,
                email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
                userName: existingUser === null || existingUser === void 0 ? void 0 : existingUser.userName
            };
            return verifyUser;
        }
        const user = new user_1.default(Object.assign({}, data));
        return yield user.save();
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.saveUser = saveUser;
const saveUserGoogle = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, userChecker_1.checkExistingUser)(data.email, data.userName);
        if (existingUser === null || existingUser === void 0 ? void 0 : existingUser.isBlocked) {
            throw new Error('user Blocked');
        }
        if (existingUser) {
            if (existingUser.isGoogle) {
                let user = {
                    _id: existingUser.id,
                    email: existingUser.email,
                    userName: existingUser.userName,
                };
                return user;
            }
            else {
                throw new Error("user already exists with this email.");
            }
        }
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = yield bcrypt_1.default.hash(randomPassword, 10);
        const newUser = yield user_1.default.create({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            isGoogle: true,
            profilePic: data.profilePic,
        });
        yield connections_1.default.create({
            userId: newUser._id
        });
        return newUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.saveUserGoogle = saveUserGoogle;
const updatePassword = (password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(password, email);
        const user = yield user_1.default.findOne({ email });
        user.password = password;
        yield user.save();
        return { message: 'Password updated successfully' };
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updatePassword = updatePassword;
