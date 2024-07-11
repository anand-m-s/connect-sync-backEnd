import { Request, Response } from 'express'
import { adminUserUsecases } from '../../../app/usecases/admin/adminUserUsecases';

export const adminPostManagment = {

    report: async (req: Request, res: Response): Promise<void> => {
        try {
            const reports = await adminUserUsecases.getReportUseCase()
            res.json(reports);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    blockPost: async (req: Request, res: Response): Promise<void> => {
        try {
            const postId = req.query.postId as string;
            console.log(postId)
            const status = await adminUserUsecases.blockPostUseCase(postId)
            res.json(status)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    getPostData: async (req: Request, res: Response): Promise<void> => {
        try {
            const posts = await adminUserUsecases.getPostUsecase()
           
            res.json(posts)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    getReportData: async (req: Request, res: Response): Promise<void> => {
        try {
            const reports = await adminUserUsecases.getReportUsecase()
            res.json(reports)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
}