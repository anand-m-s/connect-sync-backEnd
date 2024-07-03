import { Request, Response } from "express";
import chatUseCase from "../../../app/usecases/users/chat/chatUseCase";
import { createPresignedPost } from "../../../utils/s3";


export default {
    fetchAllChats: async (req: Request, res: Response) => {
        try {

            const userId = req.user.userId

            res.status(200).json(await chatUseCase.fetchAllChats(userId))

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    accessChat: async (req: Request, res: Response) => {

        const { userId } = req.body;
        const currentUser = req.user.userId

        if (!userId) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
        }
        try {
            const chat = await chatUseCase.accessChat(currentUser, userId);
            res.status(chat.status).json(chat.data);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    sendMessage: async (req: Request, res: Response) => {
        try {
            const { content, chatId } = req.body;
            if (!content || !chatId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            const userId = req.user.userId
            const data: any = {
                chat: chatId,
                content,
                sender: userId
            }
            const message = await chatUseCase.sendMessageUsecase(data)
            res.status(200).json(message)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    fileUpload: async (req: Request, res: Response) => {
        try {
            const { files, chatId } = req.body;
            if (!files || !chatId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            const userId = req.user.userId
            const data: any = {
                sender: userId,
                content: 'shared some files',
                chat: chatId,
                files: files
            }

            const message = await chatUseCase.sendFilesUsecase(data)

            res.status(200).json([message])
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    sharedPost: async (req: Request, res: Response) => {
        try {
            const { sharedPost, chatId } = req.body;
            if (!sharedPost || !chatId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }
            const userId = req.user.userId
            const data: any = {
                sender: userId,
                content: 'shared a post',
                chat: chatId,
                sharedPost:sharedPost
            }

            const message = await chatUseCase.sendFilesUsecase(data)
            console.log(message)

            res.status(200).json([message])
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    fetchAllMessages: async (req: Request, res: Response) => {
        try {
            const { chatId } = req.params
            const messages = await chatUseCase.fetchAllMessages(chatId)

            res.json(messages)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    signedUrl: async (req: Request, res: Response) => {
        try {
            let { key, content_type } = req.body;
            key = "public/" + key;
            const data = await createPresignedPost({ key, contentType: content_type });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    uploadFiles: async (req: Request, res: Response) => {
        try {
            console.log('inside upload files')
            console.log(req.body)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}