import { userRegisterInterface } from "../../../../types/userRegisterInterface.js";
import User from "../models/user.js";
import { checkExistingUser } from "../utils/userChecker.js";


export const saveUser = async (data:userRegisterInterface)=>{
    try {

        const existingUser = await checkExistingUser(data.email)
        if (existingUser) {
            // Handle the case where the user already exists
            // You might want to throw an error or return a specific message
            throw new Error("A user with that email already exists.");
        }

        const user = new User({
            ...data,
        })
        return await user.save()
    } catch (error) {
        throw new Error((error as Error).message);
    }
}