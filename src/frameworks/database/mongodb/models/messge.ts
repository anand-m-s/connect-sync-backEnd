import mongoose, { Document, Schema, mongo } from "mongoose";

export interface messageDocument extends Document {
    sender: mongoose.Types.ObjectId;
    content: string;
    chat: mongoose.Types.ObjectId;
    files: string[];
    sharedPost: mongoose.Types.ObjectId;
}

const messageSchema: Schema<messageDocument> = new Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    },
    files: [{
        fileLink: String,
        contentType: String,
    }],
    sharedPost: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export default Message;