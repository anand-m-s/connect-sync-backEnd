    import { Request,Response } from "express";
    import userAuthUsecase from '../../../app/usecases/users/userAuthUsecase'

    export default {

        registerUser :async(req:Request,res:Response)=>{
            try {
                console.log({userData:req.body})
                res.json(await userAuthUsecase.registerUser(req.body) )
            } catch (error) {
                res.status(500).json({error:(error as Error).message})
            }
        }
    }