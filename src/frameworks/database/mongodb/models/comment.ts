import mongoose, { Schema, Document } from "mongoose";

export interface commentDocument extends Document {
    postId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    content: string;
}

const commentSchema: Schema<commentDocument> = new Schema({
    postId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Post'
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,

    },
    content: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})
commentSchema.index({ postId: 1, userId: 1 });

const Comment = mongoose.model('Comment', commentSchema)

export default Comment