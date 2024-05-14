import { userRegisterInterface } from "../../../../types/userRegisterInterface";
import User from "../models/user";
import { checkExistingUser } from "../utils/userChecker";
import bcrypt from 'bcrypt'


export const saveUser = async (data: userRegisterInterface) => {
    try {

        const existingUser = await checkExistingUser(data.email, data.userName)
        if (existingUser) {
            // Handle the case where the user already exists
            // You might want to throw an error or return a specific message
            throw new Error("A user with that email or username already exists.");
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
            userName:data.userName,
            email:data.email,
            password:hashedPassword,
            isGoogle:true,
        })
        return newUser
    } catch (error) {
        throw new Error((error as Error).message);
    }
}