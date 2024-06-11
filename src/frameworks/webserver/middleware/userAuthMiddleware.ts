// import { NextFunction,Response,Request } from "express";
// import jwt from 'jsonwebtoken'
// import User from "../../database/mongodb/models/user";


// declare module 'express-serve-static-core' {
//     interface Request {
//       user?: any;     
//     }
//   }
// export const protectUser = async(req:Request,res:Response,next:NextFunction)=>{
//     let token = req.header("Authorization")
//     if(token){
//         try {
//             const decoded = jwt.verify(token,process.env.JWT_SECRET!)
//             req.user= decoded        
//             const userId = req.user.userId as string
//             let user:any = await User.findOne({_id:userId})
//             if(user.isBlocked) {
//                 res.status(401)
//                 throw new Error("User Is Blocked");
//               }
//             console.log({user})
//             next()
//         } catch (error) {
//             res.status(401)            
//             throw new Error("Not authorized Invalid token")            
//         }        
//     }else{
//         res.status(401)
//         throw new Error('Not authorized no token')
//     }
// }

import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'
import User from "../../database/mongodb/models/user";

declare module 'express-serve-static-core' {
    interface Request {
      user?: any;     
    }
}

export const protectUser = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization")
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
            req.user = decoded
            const userId = req.user.userId
            let user: any = await User.findOne({ _id: userId })
            if (!user) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            if (user.isBlocked) {
                res.status(401).json({ message: "User Is Blocked" });
                return;
            }
            next()
        } catch (error) {
            res.status(401).json({ message: "Not authorized Invalid token" });
        }
    } else {
        res.status(401).json({ message: "Not authorized no token" });
    }
}
