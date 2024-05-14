import User from "../models/user";


export const checkExistingUser = async (email:string,userName:string) => {
    const existingUser = await User.findOne({ $or: [{ email: email }, { userName:userName }] })
    return existingUser
}