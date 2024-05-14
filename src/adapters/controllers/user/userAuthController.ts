import { Request, Response } from "express";
import userAuthUsecase from '../../../app/usecases/users/userAuthUsecase'



export default {
    registerUser: async (req: Request, res: Response) => {
        try {                                   
            const user = await userAuthUsecase.registerUser(req.body,req)
            res.status(200).json({ message: "User registered successfully", user });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    verifyOtp: async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            const {user,token} = await userAuthUsecase.verifyUser(email,req)
            console.log(user)
            console.log(token)
            res.status(200).json({ message: 'OTP verified',user,token})
        }
        catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    loginUser:async(req:Request,res:Response)=>{
        try {
            const {email,password}=req.body
            const {user,token} = await userAuthUsecase.loginUser(email,password)
            console.log({user})
            res.status(200).json({message:'logged in success',
            user,token
            })
        } catch (error) {
            res.status(500).json({error:(error as Error).message})
        }
    },
    googleAuth:async(req:Request,res:Response)=>{
        try {
            console.log(req.body)
            const user = await userAuthUsecase.googleAuthUseCase(req.body)
            res.status(200).json({ message: "User registered successfully",user:user?.user,token:user?.token});
        } catch (error) {
            res.status(500).json({error:(error as Error).message})
        }
    }

}
