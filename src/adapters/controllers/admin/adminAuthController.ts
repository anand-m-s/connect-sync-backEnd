import { NextFunction, Request, Response } from "express";
import adminAuthUseCase from "../../../app/usecases/admin/adminAuthUseCase";
export default {
    registerAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await adminAuthUseCase.registerAdmin(req.body))
        } catch (error) {
            next(error)
        }
    },
    loginAdmin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            console.log(email, password)
            const result = await adminAuthUseCase.adminLogin(email, password)
            res.json(result)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    
}