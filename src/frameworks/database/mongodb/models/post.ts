import mongoose,{Schema,Document, ObjectId, SchemaType} from "mongoose";
import { UserDocument } from "./user";


export interface postDocument extends Document{
    userId:UserDocument;
    location:string;
    description:string;
    imageUrl:string[];
    isHidden:boolean;
    isBlocked:boolean;
}


const postSchema:Schema<postDocument> = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    imageUrl:{
        type:[String],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isHidden:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Post = mongoose.model('Post',postSchema)

export default Post
