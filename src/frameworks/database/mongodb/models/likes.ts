import mongoose,{Schema,Document} from "mongoose";

export interface likeDocument extends Document{
    postId:Schema.Types.ObjectId;
    likedUsers:Schema.Types.ObjectId[];
}

const likeSchema:Schema<likeDocument> = new Schema({
    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    likedUsers:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},{
    timestamps:true,
})


const Like = mongoose.model('Like',likeSchema)
export default Like