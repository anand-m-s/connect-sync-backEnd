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
const getUser_1 = require("../../../../frameworks/database/mongodb/repositories/user/getUser");
const connection_1 = require("../../../../frameworks/database/mongodb/repositories/user/connection");
exports.default = {
    getUserDetails: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside getUserDetails bussiness rule');
            return yield getUser_1.getUser.getUserDetails(data.id, data.current);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    updateProfileUseCase: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield getUser_1.getUser.updateProfile(data);
            console.log(user);
            if (user) {
                const updatedUser = {
                    userName: user.userName,
                    phone: user.phone,
                    bio: user.bio,
                    profilePic: user.profilePic
                };
                return { message: 'user profile updated', updatedUser };
            }
            else {
                throw new Error('User not found');
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getAllUserDetails: (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield getUser_1.getUser.getAllUsers(searchTerm);
            console.log('inside user case for fetch all the user data');
            console.log(users);
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    toggleFollow: (userId, userIdToToggle) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield connection_1.connection.toggleFollow(userId, userIdToToggle);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    followingUseCase: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield connection_1.connection.followingRepo(userId);
            console.log('followers and following', data);
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
