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
exports.connection = void 0;
const connections_1 = __importDefault(require("../../models/connections"));
exports.connection = {
    toggleFollow: (userId, userIdToToggle) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(userIdToToggle, userId);
            const connection = yield connections_1.default.findOne({ userId });
            const isFollowing = connection.following.includes(userIdToToggle);
            console.log(isFollowing);
            if (isFollowing) {
                yield Promise.all([
                    connections_1.default.findOneAndUpdate({ userId }, { $pull: { following: userIdToToggle } }, { new: true }),
                    connections_1.default.findOneAndUpdate({ userId: userIdToToggle }, { $pull: { followers: userId } }, { new: true })
                ]);
                return 'unfollowed';
            }
            else {
                yield Promise.all([
                    connections_1.default.findOneAndUpdate({ userId: userId }, { $addToSet: { following: userIdToToggle } }, { upsert: true, new: true }),
                    connections_1.default.findOneAndUpdate({ userId: userIdToToggle }, {
                        $addToSet: { followers: userId }
                    }, { upsert: true, new: true })
                ]);
                return 'followed';
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    followingRepo: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let data = yield connections_1.default.findOne({ userId })
                .populate('followers', 'userName profilePic _id')
                .populate('following', 'userName profilePic _id');
            console.log(data, 'following repo');
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
