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
const chat_1 = __importDefault(require("../../models/chat"));
const messge_1 = __importDefault(require("../../models/messge"));
const user_1 = __importDefault(require("../../models/user"));
const chatRepo = {
    fetchAllChats: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside fetchAllChats controller repo');
            let results = yield chat_1.default.find({ users: { $elemMatch: { $eq: userId } } })
                .populate("users", "-password")
                .populate('latestMessage')
                .sort({ updatedAt: -1 });
            results = yield user_1.default.populate(results, {
                path: "latestMessage.sender",
                select: "userName profilepic email",
            });
            return results;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    findChatBetweenUsers: (userId, otherUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside access chat usecase repo');
            let isChat = yield chat_1.default.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: userId } } },
                    { users: { $elemMatch: { $eq: otherUserId } } },
                ],
            })
                .populate("users", "-password")
                .populate("latestMessage");
            isChat = yield user_1.default.populate(isChat, {
                path: "latestMessage.sender",
                select: "userName profilePic email",
            });
            return isChat;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    createChat: (chatData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside create chat');
            return yield chat_1.default.create(chatData);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    findChatById: (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside find chat by id');
            return yield chat_1.default.findOne({ _id: chatId }).populate("users", "-password");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    sendMessage: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(data);
            let message = yield messge_1.default.create(data);
            yield message.populate([
                { path: 'sender', select: 'userName profilePic' },
                { path: 'chat' },
            ]);
            message = yield user_1.default.populate(message, {
                path: "chat.users",
                select: "name pic email",
            });
            yield chat_1.default.findByIdAndUpdate(data.chat, { latestMessage: message });
            console.log(message);
            return message;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    fetchAllMessagesRepo: (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const messages = yield messge_1.default.find({ chat: chatId })
                .populate('sender', 'userName profilePic email')
                .populate('chat');
            return messages;
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
exports.default = chatRepo;
