import User, { UserDocument } from "../../models/user";
import { checkUserName } from "../../utils/userChecker";
import Connection, { connectionDocument } from "../../models/connections";

export const getUser = {
    getUserByEmail: async (email: string) => {
        try {
            return await User.findOne({ email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserDetails: async (id: string, current: string) => {
        try {

            const user = await User.findById(id)
            // console.log({user})
            const isFollow = await Connection.findOne({ userId: current })
            const connectionData = await Connection.findOne({ userId: id })

            // console.log({isFollow})
            if (user) {
                const isFollowing: Boolean | null = isFollow && isFollow.following.includes(user._id)
                let data = {
                    id: user.id,
                    userName: user.userName,
                    bio: user.bio,
                    phone: user.phone,
                    profilePic: user.profilePic,
                    isFollowing: isFollowing,
                    following: connectionData?.followers.length,
                    followers: connectionData?.following.length
                }
                return data
            } else {
                throw new Error('user not found')
            }

        } catch (error) {
            throw new Error((error as Error).message);

        }
    },
    updateProfile: async (data: UserDocument) => {
        try {
            const existingUser = await checkUserName(data.userName, data.id)
            if (existingUser) {
                existingUser.bio = data.bio || '',
                    existingUser.userName = data.userName,
                    existingUser.phone = data.phone || '',
                    existingUser.profilePic = data.profilePic ? data.profilePic : existingUser.profilePic
                await existingUser?.save()
                return existingUser
            } else {
                throw new Error('Another user have the same username try another one :)')
            }
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },
    getAllUsers: async (searchTerm: string) => {
        try {
            const query = searchTerm
                ? { userName: { $regex: searchTerm, $options: 'i' } }
                : {};
            const allUsers = await User.find(query).lean();
            console.log('inside get user for fetch all the user data')
            return allUsers
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}



