import User from "../../models/user";

export const verifyUser = async(email:string)=>{
    try {
        console.log(email)
        const updatedUser = await User.findOneAndUpdate({email},{isVerified:true},{new:true})
        if(!updatedUser){
            throw new Error('user not found')
        }
        const user ={
            id:updatedUser.id,
            email:updatedUser.email,
            userName:updatedUser.userName
        }
        return user       
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

