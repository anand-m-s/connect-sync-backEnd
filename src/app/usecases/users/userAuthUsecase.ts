import { userRegisterInterface, verifiedTagInterface } from "../../../types/user/userRegisterInterface"
import { saveUser, saveUserGoogle, updatePassword, verifyTagRepo } from "../../../frameworks/database/mongodb/repositories/user/userRepoMongoDb"
import { forgotPassword, verifyUser } from "../../../frameworks/database/mongodb/repositories/user/isVerified"
import { generateToken } from "../../utils/generateToken"
import { UserDocument } from "../../../frameworks/database/mongodb/models/user"
import { getUser } from "../../../frameworks/database/mongodb/repositories/user/getUser"

export default {
    registerUser: async (data: userRegisterInterface) => {
        try {
          
            const savedUser = await saveUser(data)
            const user = {
                id: savedUser._id,
                email: savedUser.email,
                userName: savedUser.userName
            }           
            return user

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    verifyUser: async (email: string) => {
        try {
            const user = await verifyUser(email)
            const role: string = 'user'
            let token = generateToken(user.id, role)
            const accessToken = token.token
            const refreshToken = token.refreshToken
            return { user, accessToken, refreshToken }
        } catch (error) {

            throw new Error((error as Error).message)
        }
    },

    loginUser: async (email: string, password: string) => {
        try {
            const existingUser: UserDocument | null = await getUser.getUserByEmail(email)
            let token;
            let user;
            if (existingUser && (await existingUser.matchPassword(password))) {
                if (!existingUser.isVerified) {
                    throw new Error('Not verified,Sign up again!')
                }
                if (existingUser.isBlocked) {
                    throw new Error('User blocked')
                }
                const role: string = 'user'
                token = generateToken(existingUser.id, role)
                user = {
                    id: existingUser.id,
                    userName: existingUser.userName,
                    email: existingUser.email,
                    bio: existingUser?.bio,
                    phone: existingUser?.phone,
                    profilePic: existingUser?.profilePic,
                    verified:existingUser?.verifiedTag,
                    verifiedExp:existingUser?.verifiedTagPurchasedAt

                }
            } else {
                throw new Error('Invalid credentials')
            }

            const accessToken = token.token
            const refreshToken = token.refreshToken
            return { user, accessToken, refreshToken }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    googleAuthUseCase: async (data: userRegisterInterface) => {
        try {
            const savedUser = await saveUserGoogle(data)

                // const user = {
                //     id: savedUser._id,
                //     email: savedUser.email,
                //     userName: savedUser.userName,
                //     profilePic: savedUser.profilePic,
                //     verified:saveUser?.verified,
                //     verifiedExp:saveUser?.verifiedExp
                // }
                const role: string = 'user'
                const token = generateToken(savedUser.id, role)
                const accessToken = token.token
                const refreshToken = token.refreshToken
                return { user:savedUser, accessToken, refreshToken }
            
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    forgotPassword: async (email: string) => {
        try {
            return await forgotPassword(email)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    updatePassword: async (password: string, email: string) => {
        try {
            console.log('inside usecase')
            console.log(email)
            console.log(password)
            return await updatePassword(password, email)
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    verifyTagUseCase: async (data:verifiedTagInterface,userId:string) => {
        try {
            await verifyTagRepo(data,userId)

        } catch (error) {
            throw new Error((error as Error).message)

        }
    }


}