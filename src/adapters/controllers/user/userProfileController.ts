import { Response,Request } from "express";
import userProfileUseCase from "../../../app/usecases/users/profile/userProfileUseCase";


export default{
    getUserDetails: async (req: Request, res: Response) => {
        try {
            console.log('inside getUserdetails')
            const userId = req.query.id as string
            const currentUser = req.user.userId
            console.log({currentUser})
            // if (typeof userId !== 'string') {
            //     res.status(400).json({ error: 'Invalid user ID' });
            //     return;
            //   }          
            const userDetails = await userProfileUseCase.getUserDetails({ id: userId,current:currentUser });
            res.json(userDetails)

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    
    updateProfile: async (req: Request, res: Response) => {
        console.log(req.body)
        try {
            const updatedUser = await userProfileUseCase.updateProfileUseCase(req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
        
    },
    getAllUserDetails:async(req:Request,res:Response)=>{
        try {       
            const searchTerm = req.query.searchTerm as string;
            console.log('inside controller lookin for search term')
            console.log(searchTerm)
            res.json(await userProfileUseCase.getAllUserDetails(searchTerm))
        } catch (error) {            
            res.status(500).json({ error: (error as Error).message })
        }
    },
    followToggle:async(req:Request,res:Response)=>{
        try {       
            const userId = req.user.userId            
            const {userIdToToggle}= req.body
            console.log(userId,'userId')
            console.log(userIdToToggle,'userIdto toggle')
            if(userId && userIdToToggle){
                const message =await userProfileUseCase.toggleFollow(userId,userIdToToggle)
                console.log(message)
                res.status(200).json({message:message})
            }else {
                res.status(400).json({ error: 'User ID not found' });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })            
        }
    },
    followingData: async (req: Request, res: Response) => {
        try {
            const userId = req.query.userId as string
            console.log(userId)            
            const data =await userProfileUseCase.followingUseCase(userId)
            console.log({data})
            res.status(200).json({data})
            
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}