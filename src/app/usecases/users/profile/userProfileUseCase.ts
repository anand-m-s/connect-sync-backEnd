import { UserDocument } from "../../../../frameworks/database/mongodb/models/user"
import { getUser } from "../../../../frameworks/database/mongodb/repositories/user/getUser"
import { connection } from '../../../../frameworks/database/mongodb/repositories/user/connection'
import { ObjectId } from "mongoose"
export default {
    getUserDetails: async (data: { id: string, current: string }) => {
        try {

            return await getUser.getUserDetails(data.id, data.current)

        } catch (error) {

            throw new Error((error as Error).message)
        }
    },

    updateProfileUseCase: async (data: UserDocument,userId:string) => {
        try {
            const user = await getUser.updateProfile(data,userId)       
            if (user) {
                const updatedUser = {
                    userName: user.userName,
                    phone: user.phone,
                    bio: user.bio,
                    profilePic: user.profilePic
                }
                return { message: 'user profile updated', updatedUser }
            } else {
                throw new Error('User not found');
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getAllUserDetails: async (searchTerm: string) => {
        try {
            const users = await getUser.getAllUsers(searchTerm)
            console.log('inside user case for fetch all the user data')
            console.log(users!)
            return users

        } catch (error) {

            throw new Error((error as Error).message)
        }
    },
    toggleFollow: async (userId: ObjectId, userIdToToggle: ObjectId) => {
        try {
            return await connection.toggleFollow(userId, userIdToToggle)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    followingUseCase: async (userId: string) => {
        try {
            const data = await connection.followingRepo(userId)
            return data

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getNotificationUseCase: async (userId: string) => {
        try {           
            return await connection.getNotificationRepo(userId)
        } catch (error) {

            throw new Error((error as Error).message)
        }
    }
}