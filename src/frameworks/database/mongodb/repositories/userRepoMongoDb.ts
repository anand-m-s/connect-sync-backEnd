import { userRegisterInterface } from "../../../../types/userRegisterInterface";
import User, { UserDocument } from "../models/user";
import { checkExistingUser, checkUserName } from "../utils/userChecker";
import bcrypt from 'bcrypt'


export const saveUser = async (data: userRegisterInterface) => {
    try {

        const existingUser = await checkExistingUser(data.email, data.userName)
        if (existingUser?.isVerified) {
            // Handle the case where the user already exists
            // You might want to throw an error or return a specific message
            throw new Error("A user with that email or username already exists.");
        }
        if (existingUser && !existingUser.isVerified) {
            let verifyUser = {
                _id: existingUser?.id,
                email: existingUser?.email,
                userName: existingUser?.userName
            }
            return verifyUser
        }

        const user = new User({
            ...data,
        })

        return await user.save()
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
export const saveUserGoogle = async (data: userRegisterInterface) => {
    try {
        const existingUser = await checkExistingUser(data.email, data.userName)
        if (existingUser?.isBlocked) {
            throw new Error('user Blocked')
        }
        if (existingUser) {
            if (existingUser.isGoogle) {
                let user = {
                    _id: existingUser.id,
                    email: existingUser.email,
                    userName: existingUser.userName,
                }
                return user
            } else {
                throw new Error("user already exists with this email.");
            }
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        const hashedPassword = await bcrypt.hash(randomPassword, 10)
        const newUser = await User.create({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            isGoogle: true,
        })
        return newUser
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
export const updateProfile = async (data: UserDocument) => {
    try {
        const existingUser = await checkUserName(data.userName, data.id)
        if (existingUser) {         
                existingUser.bio = data.bio || '',
                    existingUser.userName = data.userName,
                    existingUser.phone = data.phone || '',
                    existingUser.profilePic = data.profilePic?data.profilePic:existingUser.profilePic
                    await existingUser?.save()
                return existingUser       
        } else {
            throw new Error('Another user have the same username try another one :)')
        }
    } catch (error) {
        throw new Error((error as Error).message);

    }
}

export const getUserDetails = async (data: { id: string }) => {
    try {
        console.log('inside mongo db repo')
        const user = await User.findById(data.id)
        if (user) {
            let data = {
                id: user.id,
                userName: user.userName,
                bio: user.bio,
                phone: user.phone,
                profiePic:user.profilePic
            }
            return data
        } else {
            throw new Error('user not found')
        }

    } catch (error) {
        throw new Error((error as Error).message);

    }
}