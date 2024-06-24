import { messageInterface } from "../../../../../types/user/chat";
import Chat from "../../models/chat";
import Message from "../../models/messge";
import User from "../../models/user";

const chatRepo = {

    fetchAllChats: async (userId: string) => {
        try {
      
            let results: any = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
                .populate("users", "-password")
                .populate('latestMessage')
                .sort({ updatedAt: -1 })

            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "userName profilepic email",
            });
        
            return results;

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    findChatBetweenUsers: async (userId: string, otherUserId: string) => {
        try {
         

            let isChat = await Chat.find({
                isGroupChat: false,
                $and: [
                    { users: { $elemMatch: { $eq: userId } } },
                    { users: { $elemMatch: { $eq: otherUserId } } },
                ],
            })
                .populate("users", "-password")
                .populate("latestMessage") as any;

            isChat = await User.populate(isChat, {
                path: "latestMessage.sender",
                select: "userName profilePic email",
            });
           
            return isChat;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    createChat: async (chatData: any) => {
        try {
            console.log('inside create chat')
            return await Chat.create(chatData);
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    findChatById: async (chatId: string) => {
        try {
            console.log('inside find chat by id')
            return await Chat.findOne({ _id: chatId }).populate("users", "-password");
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    sendMessage: async (data: messageInterface) => {
        try {            
            let message: any = await Message.create(data);
            await message.populate([
                { path: 'sender', select: 'userName profilePic' },
                { path: 'chat' },
            ])
            message = await User.populate(message, {
                path: "chat.users",
                select: "userName profilePic email",
            });
            await Chat.findByIdAndUpdate(data.chat, { latestMessage: message });            
            return message;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    sendFilesRepo: async (data: messageInterface) => {
        try {            
            console.log({data})
            let message: any = await Message.create(data);
            await message.populate([
                { path: 'sender', select: 'userName profilePic' },
                { path: 'chat' },
            ])
            message = await User.populate(message, {
                path: "chat.users",
                select: "userName profilePic email",
            });
            await Chat.findByIdAndUpdate(data.chat, { latestMessage: message });            
            return message;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    fetchAllMessagesRepo: async (chatId: string) => {
        try {
            const messages = await Message.find({chat:chatId})
            .populate('sender','userName profilePic email')
            .populate('chat')
            return messages
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
};

export default chatRepo;
