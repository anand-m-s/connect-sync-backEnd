
import { Request } from "express"
import { userRegisterInterface } from "../../../types/userRegisterInterface"
import { saveUser,saveUserGoogle } from "../../../frameworks/database/mongodb/repositories/userRepoMongoDb"
import { verifyUser } from "../../../frameworks/database/mongodb/repositories/user/isVerified"
import sendVerifyMail from "../../../infrastructure/email/emailService"
import { generateOtp } from "../../../utils/otpGeneratorFun"
import { validateOtp } from "../../../utils/otpValidation"
import { cleanupSessionData } from "../../../utils/sessionCleanUp"
import { generateToken } from "../../utils/generateToken"
import { UserDocument } from "../../../frameworks/database/mongodb/models/user"
import { getUser } from "../../../frameworks/database/mongodb/repositories/user/getUser"

export default {
    registerUser: async (data: userRegisterInterface, req: Request) => {
        try {
            const { userName, email } = req.body;
            const savedUser = await saveUser(data)
            if (savedUser) {
                const otp = generateOtp();
                const sessionData = req.session!;
                sessionData.otp = otp;
                sessionData.otpGeneratedTime = Date.now();
                sendVerifyMail(req, userName, email)
            } else {
                throw new Error("Failed to register user");
            }
            const user = {
                id: savedUser.id,
                email: savedUser.email,
                userName: savedUser.userName
            }
            return user

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    verifyUser: async (email: string, req: Request) => {
        try {
            if (!validateOtp(req)) {
                throw new Error('Invalid Otp')
            }
            cleanupSessionData(req)
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
            console.log({existingUser})
            let token;
            let user;
            if(existingUser &&(await existingUser.matchPassword(password))){
                 token = generateToken(existingUser.id)
                 user={
                    id:existingUser.id,
                    userName:existingUser.userName,
                    email:existingUser.email
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
            console.log({savedUser})
            if(savedUser){
                const user = {
                    id: savedUser._id,
                    email: savedUser.email,
                    userName: savedUser.userName
                }
                let token = generateToken(user.id)
                return {user,token}
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}