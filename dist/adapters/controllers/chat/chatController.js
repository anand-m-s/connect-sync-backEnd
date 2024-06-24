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
const chatUseCase_1 = __importDefault(require("../../../app/usecases/users/chat/chatUseCase"));
exports.default = {
    fetchAllChats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log('inside fetchAllChats controller');
            const userId = req.user.userId;
            console.log(userId, 'userId from fetch all chats');
            res.status(200).json(yield chatUseCase_1.default.fetchAllChats(userId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    accessChat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('inside access chat');
        const { userId } = req.body;
        console.log(userId, 'userId:::::::::::::::::');
        const currentUser = req.user.userId;
        console.log(currentUser, "current user::::::::::::");
        if (!userId) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
        }
        try {
            const chat = yield chatUseCase_1.default.accessChat(currentUser, userId);
            res.status(chat.status).json(chat.data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    sendMessage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { content, chatId } = req.body;
            if (!content || !chatId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            const userId = req.user.userId;
            console.log(content, chatId);
            const data = {
                chat: chatId,
                content,
                sender: userId
            };
            console.log(data);
            const message = yield chatUseCase_1.default.sendMessageUsecase(data);
            console.log(message);
            res.status(200).json(message);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    fetchAllMessages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { chatId } = req.params;
            const messages = yield chatUseCase_1.default.fetchAllMessages(chatId);
            res.json(messages);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};
