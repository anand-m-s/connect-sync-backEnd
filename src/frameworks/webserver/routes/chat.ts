import express from "express";  
import { protectUser } from "../middleware/userAuthMiddleware";
import chatController from "../../../adapters/controllers/chat/chatController";

export const chatRouter = express.Router()


chatRouter.get('/',protectUser,chatController.fetchAllChats)
chatRouter.post('/',protectUser,chatController.accessChat)
chatRouter.post('/message',protectUser,chatController.sendMessage)
