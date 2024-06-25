import { userRegisterInterface } from "../../../../../types/user/userRegisterInterface";
import User, { UserDocument } from "../../models/user";
import { checkExistingUser} from "../../utils/userChecker";
import bcrypt from 'bcrypt'
import Connection from "../../models/connections";


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
                    profilePic:existingUser.profilePic
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
            profilePic: data.profilePic,
        })
        await Connection.create({
            userId: newUser._id
        })

        return newUser
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const updatePassword=async(password:string,email:string)=>{
    try {
        console.log(password,email)
        const user:any = await User.findOne({email})
        user.password = password
        await user.save()   
        return { message: 'Password updated successfully' };     
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
