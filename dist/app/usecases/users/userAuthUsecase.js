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
Object.defineProperty(exports, "__esModule", { value: true });
const userRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/user/userRepoMongoDb");
const isVerified_1 = require("../../../frameworks/database/mongodb/repositories/user/isVerified");
const generateToken_1 = require("../../utils/generateToken");
const getUser_1 = require("../../../frameworks/database/mongodb/repositories/user/getUser");
exports.default = {
    registerUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside register user');
            const savedUser = yield (0, userRepoMongoDb_1.saveUser)(data);
            const user = {
                id: savedUser._id,
                email: savedUser.email,
                userName: savedUser.userName
            };
            console.log(savedUser);
            console.log(user);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    verifyUser: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, isVerified_1.verifyUser)(email);
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
            let token;
            let user;
            if (existingUser && (yield existingUser.matchPassword(password))) {
                if (!existingUser.isVerified) {
                    throw new Error('Not verified,Sign up again!');
                }
                if (existingUser.isBlocked) {
                    throw new Error('User blocked');
                }
                token = (0, generateToken_1.generateToken)(existingUser.id);
                user = {
                    id: existingUser.id,
                    userName: existingUser.userName,
                    email: existingUser.email,
                    bio: existingUser === null || existingUser === void 0 ? void 0 : existingUser.bio,
                    phone: existingUser === null || existingUser === void 0 ? void 0 : existingUser.phone,
                    profilePic: existingUser === null || existingUser === void 0 ? void 0 : existingUser.profilePic,
                };
            }
            else {
                throw new Error('Invalid credentials');
            }
            return { user, token };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    googleAuthUseCase: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const savedUser = yield (0, userRepoMongoDb_1.saveUserGoogle)(data);
            console.log({ savedUser });
            if (savedUser) {
                const user = {
                    id: savedUser._id,
                    email: savedUser.email,
                    userName: savedUser.userName,
                };
                let token = (0, generateToken_1.generateToken)(user.id);
                return { user, token };
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    forgotPassword: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield (0, isVerified_1.forgotPassword)(email);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    updatePassword: (password, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside usecase');
            console.log(email);
            console.log(password);
            return yield (0, userRepoMongoDb_1.updatePassword)(password, email);
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
