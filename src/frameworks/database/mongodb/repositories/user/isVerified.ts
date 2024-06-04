import User from "../../models/user";
import Connection from "../../models/connections";

export const verifyUser = async (email: string) => {
    try {
        console.log(email)
        const updatedUser = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true })
        if (!updatedUser) {
            throw new Error('User not found')
        }
        const user = {
            id: updatedUser.id,
            email: updatedUser.email,
            userName: updatedUser.userName
        }
        await Connection.create({
            userId: updatedUser.id
        })
        return user
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const forgotPassword = async (email: string) => {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return { message: 'User does not exist' };
        }
        if (user.isGoogle) {
            return { message: 'User logged in via Google' };
        }
        return {
            email: user.email,
            userName: user.userName,
            message: 'Verify OTP now',
        };
    } catch (error) {
        throw new Error((error as Error).message)
    }
}



