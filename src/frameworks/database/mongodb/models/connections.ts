import mongoose, { Document, Schema } from "mongoose";


export interface connectionInterface {
    userId: Schema.Types.ObjectId;
    followers: Schema.Types.ObjectId[];
    following: Schema.Types.ObjectId[];
    blockedUsers: Schema.Types.ObjectId[];
}
export interface connectionDocument extends Document, connectionInterface { }

const connectionSchema: Schema<connectionDocument> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    following: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    blockedUsers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }
}, {
    timestamps: true,
})


const Connection = mongoose.model('Connection', connectionSchema)

export default Connection;