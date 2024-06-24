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
const userPostUseCase_1 = __importDefault(require("../../../app/usecases/users/post/userPostUseCase"));
exports.default = {
    savePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside post controller');
            console.log(req.body);
            yield userPostUseCase_1.default.userPostSave(req.body);
            res.status(200).json({ message: 'post uploaded success' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getUserPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ error: 'Missing id parameter' });
            }
            const post = yield userPostUseCase_1.default.getUserPostUseCase(id);
            res.status(200).json({ message: 'Data fetched', post });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    userFeedPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).json(yield userPostUseCase_1.default.userFeedPost());
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deletePost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { postId } = req.params;
            console.log(postId, 'postId');
            res.status(200).json(yield userPostUseCase_1.default.deletePostUseCase(postId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    editPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).json(yield userPostUseCase_1.default.editPostUseCase(req.body));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    allComments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postId = req.query.postId;
            const comments = yield userPostUseCase_1.default.getAllComments(postId);
            // console.log(comments)
            res.status(200).json(comments);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    addComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data);
            yield userPostUseCase_1.default.addCommentUseCase(data);
            res.status(200).json({ message: 'comment added succesfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    addReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            console.log(data);
            yield userPostUseCase_1.default.replyUseCase(data);
            res.status(200).json({ message: 'comment added succesfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    postLike: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.userId;
            const postId = req.query.postId;
            console.log(userId, postId);
            const { action, likeCount } = yield userPostUseCase_1.default.likePost(userId, postId);
            res.status(200).json({ action, likeCount });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
            res.status(500).json({ error: error.message });
        }
    }),
    isLiked: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postId = req.query.postId;
            const userId = req.user.userId;
            console.log(postId);
            const status = yield userPostUseCase_1.default.likeStatusUseCase(postId, userId);
            res.status(200).json(status);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    postReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.userId; // assuming `req.user` is populated by `protectUser` middleware
            const { postId, reason, additionalReason } = req.body;
            const data = {
                postId,
                reason,
                additionalReason,
                userId
            };
            console.log(data);
            const report = yield userPostUseCase_1.default.reportUseCase(data);
            console.log(report);
            res.status(200).json({ message: report });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};
