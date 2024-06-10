import mongoose, { Schema, Document } from "mongoose";

export interface replayDocument extends Document {
    commentId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    reply: string;
    parentId?: Schema.Types.ObjectId;
}

const replaySchema: Schema<replayDocument> = new Schema({
    commentId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Comment'
    },
    userId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    reply:{
        type: String,
        required: true
    },
    parentId: {
        type: Schema.ObjectId,
        ref: 'Reply',
        default: null
    }

},
    {
        timestamps: true
    })

replaySchema.index({ commentId: 1, userId: 1 });

const Replay = mongoose.model('Replay', replaySchema)

export default Replay