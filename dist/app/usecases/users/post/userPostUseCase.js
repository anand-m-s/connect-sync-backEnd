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
const postRepo_1 = require("../../../../frameworks/database/mongodb/repositories/user/postRepo");
exports.default = {
    userPostSave: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield postRepo_1.postRepo.savePost(data);
            console.log(post);
            return post;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUserPostUseCase: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allPost = yield postRepo_1.postRepo.getAllPost(id);
            return allPost;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    userFeedPost: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield postRepo_1.postRepo.getUsersPost();
            return posts.map(post => {
                const { _id, userId, imageUrl, location, description } = post;
                const { userName, profilePic } = userId;
                return { _id, userId: userId._id, userName, profilePic, imageUrl, location, description };
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    deletePostUseCase: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield postRepo_1.postRepo.deletePost(postId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    editPostUseCase: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(data);
            return yield postRepo_1.postRepo.editPost(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getAllComments: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(postId);
            return yield postRepo_1.postRepo.getAllComments(postId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    addCommentUseCase: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield postRepo_1.postRepo.addCommentRepo(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    replyUseCase: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield postRepo_1.postRepo.addReply(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    likePost: (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield postRepo_1.postRepo.likePost(userId, postId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    likeStatusUseCase: (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield postRepo_1.postRepo.likeStatusRepo(postId, userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    reportUseCase: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside use case');
            return yield postRepo_1.postRepo.reportRepo(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
