"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = __importDefault(require("express"));
const userAuthMiddleware_1 = require("../middleware/userAuthMiddleware");
const chatController_1 = __importDefault(require("../../../adapters/controllers/chat/chatController"));
exports.chatRouter = express_1.default.Router();
exports.chatRouter.get('/', userAuthMiddleware_1.protectUser, chatController_1.default.fetchAllChats);
exports.chatRouter.post('/', userAuthMiddleware_1.protectUser, chatController_1.default.accessChat);
exports.chatRouter.post('/message', userAuthMiddleware_1.protectUser, chatController_1.default.sendMessage);
exports.chatRouter.get('/message/:chatId', userAuthMiddleware_1.protectUser, chatController_1.default.fetchAllMessages);
