import { Request, Response } from "express"
import userPostUseCase from "../../../app/usecases/users/post/userPostUseCase"



export default {
    savePost: async (req: Request, res: Response) => {
        try {
            console.log('inside post controller')
            console.log(req.body)
            const data = await userPostUseCase.userPostSave(req.body)
            console.log(data)
            res.status(200).json({ message: 'post uploaded success' })


        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    getUserPost: async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                return res.status(400).json({ error: 'Missing id parameter' });
            }      
            const post = await userPostUseCase.getUserPostUseCase(id);
            res.status(200).json({ message: 'Data fetched', post });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
   
}