import mongoose,{Document,Schema} from "mongoose";
import { UserDocument } from "./user";

export interface chatDocument extends Document{
    chatName:string;
    isGroupChat:boolean;
    users:UserDocument[];
    latestMessage:Schema.Types.ObjectId;
    groupAdmin:UserDocument;    
}
const chatSchema:Schema<chatDocument> = new Schema(
    {
        chatName:{
            type:String,
            trim:true
        },
        isGroupChat:{
            type:Boolean,default:false
        },
        users:[{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }],
        latestMessage:{
            type:mongoose.Schema.ObjectId,
            ref:'Message'
        },
        groupAdmin:{
            type:mongoose.Types.ObjectId,
            ref:'User'
        }

    },{
        timestamps:true
    }
)

const Chat = mongoose.model('Chat',chatSchema)
export default Chat;