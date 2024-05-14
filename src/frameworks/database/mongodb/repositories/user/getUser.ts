import User from "../../models/user";


export const getUser={
    getUserByEmail:async(email:string)=>{
        try {
            return await User.findOne({email})
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

}