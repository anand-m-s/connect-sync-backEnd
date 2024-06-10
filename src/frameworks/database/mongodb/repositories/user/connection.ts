import { ObjectId } from "mongoose"
import Connection, { connectionDocument } from "../../models/connections"



export const connection = {
    toggleFollow: async (userId: ObjectId, userIdToToggle: ObjectId) => {
        try {
            console.log(userIdToToggle, userId)
            const connection: any = await Connection.findOne({ userId })
            const isFollowing: Boolean | null = connection.following.includes(userIdToToggle)
            console.log(isFollowing)
            if (isFollowing) {
                await Promise.all([
                    Connection.findOneAndUpdate({ userId },
                        { $pull: { following: userIdToToggle } },
                        { new: true }
                    ),
                    Connection.findOneAndUpdate({ userId: userIdToToggle },
                        { $pull: { followers: userId } },
                        { new: true }
                    )
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
                    }, { upsert: true, new: true })
                ])
                return 'followed'
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    followingRepo: async (userId: string) => {
        try {
            let data:any = await Connection.findOne({ userId })
            .populate('followers','userName profilePic _id')
            .populate('following','userName profilePic _id')
            console.log(data,'following repo')
            return data
        } catch (error) {
            throw new Error((error as Error).message)

        }
    }
}



