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
exports.adminRepo = void 0;
const admin_1 = require("../../models/admin");
const post_1 = __importDefault(require("../../models/post"));
const report_1 = __importDefault(require("../../models/report"));
const user_1 = __importDefault(require("../../models/user"));
exports.adminRepo = {
    loginAdmin: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield admin_1.Admin.findOne({ email: email });
            console.log(admin);
            if (admin && (yield admin.matchPassword(password))) {
                return admin;
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    fetchAllusers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield user_1.default.find({}).select('userName email isBlocked profilePic').lean();
            return users || null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    blockUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findById(userId);
            if (!user) {
                throw new Error('user not found');
            }
            user.isBlocked = !user.isBlocked;
            yield user.save();
            return user.isBlocked ? 'user blocked' : 'unblocked';
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getReportRepo: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reports = yield report_1.default.find({})
                .populate({
                path: 'postId',
                populate: {
                    path: 'userId',
                    select: 'userName profilePic',
                },
                select: 'imageUrl isBlocked',
            })
                .populate({
                path: 'users.userId',
                select: 'userName profilePic',
            });
            // console.log(reports!)
            return reports;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    blockPostRepo: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const post = yield post_1.default.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            post.isBlocked = !post.isBlocked;
            yield post.save();
            // console.log(post);
            return {
                success: true,
                message: `Post ${post.isBlocked ? 'blocked' : 'unblocked'} successfully`
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
