import { Request, Response } from "express";
import chatUseCase from "../../../app/usecases/users/chat/chatUseCase";
import { messageInterface } from "../../../types/user/chat";


export default {
    fetchAllChats: async (req: Request, res: Response) => {
        try {
            console.log('inside fetchAllChats controller')
            const userId = req.user.userId
            console.log(userId,'userId from fetch all chats')
            res.status(200).json(await chatUseCase.fetchAllChats(userId))

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    accessChat: async (req: Request, res: Response) => {
        console.log('inside access chat')
        const { userId } = req.body;
        console.log(userId,'userId:::::::::::::::::')
        const currentUser = req.user.userId
        console.log(currentUser,"current user::::::::::::")
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
    sendMessage:async(req:Request,res:Response)=>{
        try {
            const {content,chatId} = req.body;
            if (!content || !chatId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
              }
              const userId = req.user.userId
              console.log(content,chatId)
              const data:any = {
                chat:chatId,
                content,
                sender:userId                
              }
              console.log(data)
            const message = await chatUseCase.sendMessageUsecase(data)
            console.log(message)
            res.status(200).json(message)


        } catch (error) {            
            res.status(500).json({ error: (error as Error).message })
        }
    }


}