
import chatRepo from "../../../../frameworks/database/mongodb/repositories/user/chatRepo"
import { messageInterface } from "../../../../types/user/chat"

export default {

    fetchAllChats: async (userId: string) => {
        try {
            console.log('inside fetchAllChats useCase controller')
            return await chatRepo.fetchAllChats(userId)
        } catch (error) {
            throw new Error((error as Error).message)

        }

    },
    accessChat: async (userId: string, otherUserId: string) => {
        console.log('inside access chat usecase')
        console.log(userId, otherUserId)

        if (!otherUserId) {
            throw new Error("UserId param not sent with request");
        }

        let isChat = await chatRepo.findChatBetweenUsers(userId, otherUserId);

        if (isChat.length > 0) {
            return { status: 200, data: isChat[0] };
        } else {
            try {
                const chatData = {
                    chatName: "sender",
                    isGroupChat: false,
                    users: [userId, otherUserId],
                };
                const createdChat = await chatRepo.createChat(chatData);
                const fullChat = await chatRepo.findChatById(createdChat._id);
                return { status: 200, data: fullChat };
            } catch (error) {
                throw new Error((error as Error).message)
            }
        }
    },
    sendMessageUsecase: async (data: messageInterface) => {
        try {
            console.log(data)
            return await chatRepo.sendMessage(data)
        } catch (error) {
            throw new Error((error as Error).message)
        }
        
    },
    fetchAllMessages:async(chatId:string)=>{
        try {
            return await chatRepo.fetchAllMessagesRepo(chatId)
        } catch (error) {            
            throw new Error((error as Error).message)
        }
    }


}