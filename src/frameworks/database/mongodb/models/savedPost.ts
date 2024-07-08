import mongoose, { Schema, Document } from "mongoose";

export interface savedPostDocument extends Document {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
}

const savedPostSchema: Schema<savedPostDocument> = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: Schema.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true })

const SavedPost = mongoose.model('SavedPost',savedPostSchema)

export default  SavedPost