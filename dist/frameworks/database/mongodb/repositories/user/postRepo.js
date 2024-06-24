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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepo = void 0;
const comment_1 = __importDefault(require("../../models/comment"));
const likes_1 = __importDefault(require("../../models/likes"));
const post_1 = __importDefault(require("../../models/post"));
const replies_1 = __importDefault(require("../../models/replies"));
const report_1 = __importDefault(require("../../models/report"));
exports.postRepo = {
    savePost: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const post = new post_1.default(Object.assign({}, data));
        return post.save();
    }),
    getAllPost: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield post_1.default.find({ userId: id }).lean();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUsersPost: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield post_1.default.find({ isBlocked: false })
                .populate('userId', 'userName profilePic')
                .sort({ createdAt: -1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    deletePost: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield post_1.default.findByIdAndDelete(postId);
            return;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    editPost: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id } = data, updateData = __rest(data, ["_id"]);
            const updatedPost = yield post_1.default.findByIdAndUpdate(_id, updateData, { new: true });
            if (!updatedPost) {
                throw new Error('Post not found');
            }
            return;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getAllComments: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside getAllcomments repo');
            const comments = yield comment_1.default.find({ postId })
                .populate('userId', 'userName profilePic')
                .lean();
            for (const comment of comments) {
                comment.replies = yield exports.postRepo.fetchReplies(comment._id);
            }
            // console.log(comments);
            return comments;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    fetchReplies: (commentId_1, ...args_1) => __awaiter(void 0, [commentId_1, ...args_1], void 0, function* (commentId, parentId = null) {
        try {
            const replies = yield replies_1.default.find({ commentId, parentId })
                .populate('userId', 'userName profilePic')
                .lean();
            for (const reply of replies) {
                reply.replay = yield exports.postRepo.fetchReplies(commentId, reply._id);
            }
            return replies;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    addCommentRepo: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newComment = yield comment_1.default.create({
                postId: data.postId,
                userId: data.userId,
                content: data.newComment
            });
            newComment.save();
            return;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    addReply: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { reply, commentId, userId, parentId } = data;
            const newReply = new replies_1.default({
                commentId,
                userId,
                reply,
                parentId: parentId || null,
            });
            yield newReply.save();
            return;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    likePost: (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let like = yield likes_1.default.findOne({ postId });
            let action;
            if (!like) {
                like = yield likes_1.default.create({
                    postId,
                    likedUsers: [userId],
                });
                action = 'Liked';
            }
            else {
                const isLiked = like.likedUsers.includes(userId);
                if (isLiked) {
                    yield like.updateOne({ $pull: { likedUsers: userId } });
                    action = 'Unliked';
                }
                else {
                    yield like.updateOne({ $addToSet: { likedUsers: userId } });
                    action = 'Liked';
                }
            }
            // Re-fetch to get the latest count ========
            const likes = yield likes_1.default.findOne({ postId });
            const likeCount = likes.likedUsers.length;
            console.log({ likeCount });
            return { action, likeCount };
        }
        catch (error) {
            console.error('Error in likePost:', error);
            throw new Error(error.message);
        }
    }),
    getLikeCount: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const like = yield likes_1.default.findOne({ postId }).select('likedUsers');
            if (like) {
                return like.likedUsers.length;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    likeStatusRepo: (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const like = yield likes_1.default.findOne({ postId });
            const likeCount = like === null || like === void 0 ? void 0 : like.likedUsers.length;
            if (!like) {
                return { isLiked: false, likeCount };
            }
            const isLiked = like.likedUsers.includes(userId);
            return { isLiked, likeCount };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    reportRepo: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { postId, userId, reason, additionalReason } = data;
        try {
            console.log('inside repo');
            console.log(data);
            const report = yield report_1.default.findOne({ postId });
            if (!report) {
                yield report_1.default.create({
                    postId,
                    users: [{ userId, reason, additionalReason }],
                });
                return 'reported';
            }
            else {
                const userReport = report.users.find(user => user.userId.toString() === userId);
                if (userReport) {
                    //   userReport.reason = reason;
                    //   userReport.additionalReason = additionalReason;
                    return 'already reported';
                }
                else {
                    report.users.push({ userId, reason, additionalReason });
                }
                yield report.save();
                return 'Report submitted successfully';
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
