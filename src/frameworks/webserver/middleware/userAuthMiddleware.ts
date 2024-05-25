import { NextFunction,Response,Request } from "express";
import jwt from 'jsonwebtoken'


export const protectUser = async(req:Request,res:Response,next:NextFunction)=>{
    let token = req.header("Authorization")
    console.log('inside protect')
    if(token){
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET!)
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized Invalid token")
            
        }
        
    }else{
        res.status(401)
        throw new Error('Not authorized no token')
    }
}