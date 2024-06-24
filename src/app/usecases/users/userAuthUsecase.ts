import { userRegisterInterface } from "../../../types/user/userRegisterInterface"
import {saveUser,saveUserGoogle,updatePassword} from "../../../frameworks/database/mongodb/repositories/user/userRepoMongoDb"
import { forgotPassword, verifyUser } from "../../../frameworks/database/mongodb/repositories/user/isVerified"
import { generateToken } from "../../utils/generateToken"
import { UserDocument } from "../../../frameworks/database/mongodb/models/user"
import { getUser } from "../../../frameworks/database/mongodb/repositories/user/getUser"

export default {
    registerUser: async (data: userRegisterInterface) => {
        try {         
            console.log('inside register user')
            const savedUser = await saveUser(data)      
            const user = {
                id: savedUser._id,
                email: savedUser.email,
                userName: savedUser.userName
            }
            console.log(savedUser!)
            console.log(user!)
            return user

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    verifyUser: async (email: string) => {
        try {         
            const user = await verifyUser(email)           
            let token = generateToken(user.id)
            return { user, token }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    
    loginUser: async (email: string, password: string) => {
        try {
            const existingUser:UserDocument|null = await getUser.getUserByEmail(email)            
            let token;
            let user;
            if(existingUser &&(await existingUser.matchPassword(password))){
                if(!existingUser.isVerified){
                   throw new Error('Not verified,Sign up again!')
                }
                if(existingUser.isBlocked){
                    throw new Error('User blocked')
                }
                 token = generateToken(existingUser.id)
                 user={
                    id:existingUser.id,
                    userName:existingUser.userName,
                    email:existingUser.email,
                    bio:existingUser?.bio,
                    phone:existingUser?.phone,
                    profilePic:existingUser?.profilePic,
                 }
            }else{
                throw new Error('Invalid credentials')
            }
            return {user,token}
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    googleAuthUseCase:async(data:userRegisterInterface)=>{
        try {
            const savedUser = await saveUserGoogle(data)
          
            if(savedUser){
                const user = {
                    id: savedUser._id,
                    email: savedUser.email,
                    userName: savedUser.userName,
                                       
                }
                let token = generateToken(user.id)
                return {user,token}
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    forgotPassword:async(email:string)=>{
        try {
           return await forgotPassword(email)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    updatePassword:async(password:string,email:string)=>{
        try {
            console.log('inside usecase')
            console.log(email)
            console.log(password)
            return await updatePassword(password,email)
        } catch (error) {
            throw new Error((error as Error).message)
            
        }
    }

    
}