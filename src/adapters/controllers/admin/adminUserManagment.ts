import { adminUserUsecases } from "../../../app/usecases/admin/adminUserUsecases";
import { Request,Response } from 'express'

export const adminUserManagment = {
    fetchUserData: async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await adminUserUsecases.fetchAllUser();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    userBlock:async(req:Request,res:Response):Promise<void>=>{
        try {
            const userId = req.query.id  
            console.log(userId)       
            if (typeof userId !== 'string') {
                throw new Error('Invalid userId');
            }
            const status = await adminUserUsecases.blockUser(userId)
            console.log(status!)
            res.json({message:status})
        } catch (error) {
            res.status(500).json({error:(error as Error).message})
        }
    }
};