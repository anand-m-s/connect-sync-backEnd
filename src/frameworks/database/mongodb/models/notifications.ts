import mongoose, { Schema, Document } from 'mongoose';


interface NotificationSchema extends Document {
    user: mongoose.Schema.Types.ObjectId;
    type: 'like' | 'comment' | 'follow';
    post?: mongoose.Schema.Types.ObjectId;
    comment?: mongoose.Schema.Types.ObjectId;
    follower?: mongoose.Schema.Types.ObjectId;
    content: string;
    isRead: boolean;
  }


const notificationSchema: Schema<NotificationSchema> = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: ['like', 'comment', 'follow'],
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model<NotificationSchema>('Notification', notificationSchema);

export default Notification;
