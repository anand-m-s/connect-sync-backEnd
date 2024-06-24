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
const chatRepo_1 = __importDefault(require("../../../../frameworks/database/mongodb/repositories/user/chatRepo"));
exports.default = {
    fetchAllChats: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside fetchAllChats useCase controller');
            return yield chatRepo_1.default.fetchAllChats(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    accessChat: (userId, otherUserId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('inside access chat usecase');
        console.log(userId, otherUserId);
        if (!otherUserId) {
            throw new Error("UserId param not sent with request");
        }
        let isChat = yield chatRepo_1.default.findChatBetweenUsers(userId, otherUserId);
        if (isChat.length > 0) {
            return { status: 200, data: isChat[0] };
        }
        else {
            try {
                const chatData = {
                    chatName: "sender",
                    isGroupChat: false,
                    users: [userId, otherUserId],
                };
                const createdChat = yield chatRepo_1.default.createChat(chatData);
                const fullChat = yield chatRepo_1.default.findChatById(createdChat._id);
                return { status: 200, data: fullChat };
            }
            catch (error) {
                throw new Error(error.message);
            }
        }
    }),
    sendMessageUsecase: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(data);
            return yield chatRepo_1.default.sendMessage(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    fetchAllMessages: (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield chatRepo_1.default.fetchAllMessagesRepo(chatId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
