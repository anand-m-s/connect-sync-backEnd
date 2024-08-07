import express from "express";  
import { protectUser } from "../middleware/userAuthMiddleware";
import chatController from "../../../adapters/controllers/chat/chatController";

export const chatRouter = express.Router()


chatRouter.get('/',protectUser,chatController.fetchAllChats)
chatRouter.post('/',protectUser,chatController.accessChat)
chatRouter.post('/message',protectUser,chatController.sendMessage)
chatRouter.get('/message/:chatId',protectUser,chatController.fetchAllMessages)
chatRouter.post('/signed_url',protectUser,chatController.signedUrl)
chatRouter.post('/fileUpload',protectUser,chatController.fileUpload)
chatRouter.post('/sharedPost',protectUser,chatController.sharedPost)
// chatRouter.post('/upload',protectUser,chatController.uploadFiles)
