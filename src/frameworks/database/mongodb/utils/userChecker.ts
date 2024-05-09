import User from "../models/user";


export const checkExistingUser = async (email:string) => {
    const existingUser = await User.findOne({ email });
    return existingUser
}