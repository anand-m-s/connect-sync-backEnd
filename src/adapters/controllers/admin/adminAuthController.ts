import { NextFunction, Request, Response } from "express";
import adminAuthUseCase from "../../../app/usecases/admin/adminAuthUseCase";
export default {
    registerAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await adminAuthUseCase.registerAdmin(req.body))
        } catch (error) {
            next(error)
        }
    }
}