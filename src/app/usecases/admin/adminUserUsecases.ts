
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
    blockUser:async(userId:string)=>{
        try {
             const status = await adminRepo.blockUser(userId)
             return status
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
};