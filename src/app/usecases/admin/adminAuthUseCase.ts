import { AdminDocument } from "../../../frameworks/database/mongodb/models/admin";
import { saveAdmin } from "../../../frameworks/database/mongodb/repositories/admin/saveAdmin";
import { adminRepo } from "../../../frameworks/database/mongodb/repositories/admin/adminRepoMongodb";
import { generateToken } from "../../utils/generateToken";
export default {
    registerAdmin: async (data: AdminDocument) => {
        try {
            const saveAdmi = await saveAdmin(data)
            return saveAdmi
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    adminLogin: async (email: string, password: string) => {
        try {                             
            const admin = await adminRepo.loginAdmin(email,password)
            
            console.log(admin)
            if (!admin) {
                throw new Error('Invalid email or password');
            }
            const role:string = 'admin'

            return {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                message: 'Login successful',
                token:generateToken(admin.id,role)
            };
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}