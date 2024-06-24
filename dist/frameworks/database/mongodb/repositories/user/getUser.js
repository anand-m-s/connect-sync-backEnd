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
exports.getUser = void 0;
const user_1 = __importDefault(require("../../models/user"));
const userChecker_1 = require("../../utils/userChecker");
const connections_1 = __importDefault(require("../../models/connections"));
exports.getUser = {
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield user_1.default.findOne({ email });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUserDetails: (id, current) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside mongo db repo get userdetails');
            console.log({ id });
            console.log({ current });
            const user = yield user_1.default.findById(id);
            // console.log({user})
            const isFollow = yield connections_1.default.findOne({ userId: current });
            const connectionData = yield connections_1.default.findOne({ userId: id });
            console.log(connectionData === null || connectionData === void 0 ? void 0 : connectionData.followers.length, 'connectionData');
            console.log(connectionData === null || connectionData === void 0 ? void 0 : connectionData.following.length, 'connectionData');
            // console.log({isFollow})
            if (user) {
                const isFollowing = isFollow && isFollow.following.includes(user._id);
                console.log(isFollowing);
                let data = {
                    id: user.id,
                    userName: user.userName,
                    bio: user.bio,
                    phone: user.phone,
                    profilePic: user.profilePic,
                    isFollowing: isFollowing,
                    following: connectionData === null || connectionData === void 0 ? void 0 : connectionData.followers.length,
                    followers: connectionData === null || connectionData === void 0 ? void 0 : connectionData.following.length
                };
                return data;
            }
            else {
                throw new Error('user not found');
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    updateProfile: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield (0, userChecker_1.checkUserName)(data.userName, data.id);
            if (existingUser) {
                existingUser.bio = data.bio || '',
                    existingUser.userName = data.userName,
                    existingUser.phone = data.phone || '',
                    existingUser.profilePic = data.profilePic ? data.profilePic : existingUser.profilePic;
                yield (existingUser === null || existingUser === void 0 ? void 0 : existingUser.save());
                return existingUser;
            }
            else {
                throw new Error('Another user have the same username try another one :)');
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getAllUsers: (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = searchTerm
                ? { userName: { $regex: searchTerm, $options: 'i' } }
                : {};
            const allUsers = yield user_1.default.find(query).lean();
            console.log('inside get user for fetch all the user data');
            return allUsers;
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
