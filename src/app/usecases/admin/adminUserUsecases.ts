
import { adminRepo } from "../../../frameworks/database/mongodb/repositories/admin/adminRepoMongodb"
export const adminUserUsecases = {
    fetchAllUser: async () => {
        try {
            const allUsers = await adminRepo.fetchAllusers();
            return allUsers;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    blockUser: async (userId: string) => {
        try {
            const status = await adminRepo.blockUser(userId)
            return status
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    getReportUseCase: async () => {
        try {
            return await adminRepo.getReportRepo()
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },
    blockPostUseCase: async (postId: string) => {
        try {
            return await adminRepo.blockPostRepo(postId)
        } catch (error) {
            throw new Error((error as Error).message);
            throw new Error((error as Error).message);

        }
    },
    getPostUsecase: async () => {
        try {
            return await adminRepo.getPostData()

        } catch (error) {

            throw new Error((error as Error).message);
        }
    },
    getReportUsecase: async () => {
        try {
            return await adminRepo.getReportData()
        } catch (error) {

            throw new Error((error as Error).message);
        }
    }
};