import { ObjectId } from "mongoose"
import Connection, { connectionInterface } from "../../models/connections"
import Notification from "../../models/notifications";
import { NotificationInterface } from "../../../../../types/user/userRegisterInterface";



export const connection = {
    toggleFollow: async (userId: ObjectId, userIdToToggle: ObjectId) => {
        try {
            const connection: connectionInterface | null = await Connection.findOne({ userId })
            if (!connection) {
                throw new Error(`Connection not found for userId`);
            }
            const isFollowing: Boolean | null = connection.following.includes(userIdToToggle)
            if (isFollowing) {
                await Promise.all([
                    Connection.findOneAndUpdate({ userId },
                        { $pull: { following: userIdToToggle } },
                        { new: true }
                    ),
                    Connection.findOneAndUpdate({ userId: userIdToToggle },
                        { $pull: { followers: userId } },
                        { new: true }
                    ),
                    Notification.findOneAndDelete({
                        user: userIdToToggle,
                        type: 'follow',
                        follower: userId
                    }),
                ])
                return 'unfollowed'
            } else {
                await Promise.all([
                    Connection.findOneAndUpdate({ userId: userId },
                        { $addToSet: { following: userIdToToggle } },
                        { upsert: true, new: true }
                    ),
                    Connection.findOneAndUpdate({ userId: userIdToToggle }, {
                        $addToSet: { followers: userId }
                    }, { upsert: true, new: true }
                    ),
                    Notification.create({
                        user: userIdToToggle,
                        type: 'follow',
                        follower: userId,
                        content: 'started following you.'
                    })
                ])
                return 'following'
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    followingRepo: async (userId: string) => {
        try {
            let data: any = await Connection.findOne({ userId })
                .populate('followers', 'userName profilePic _id')
                .populate('following', 'userName profilePic _id')
            return data
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    getNotificationRepo: async (userId: string) => {
        try {   
        
            const data: NotificationInterface[] = await Notification.find({ user: userId })
            .populate({
              path: 'follower',
              select: 'userName profilePic',
            })
            .select('user type post comment follower content isRead createdAt updatedAt');
            
            return data

        } catch (error) {
            throw new Error((error as Error).message)

        }
    }
}



