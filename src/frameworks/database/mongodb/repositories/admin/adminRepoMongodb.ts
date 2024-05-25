import { Admin } from "../../models/admin";
import { AdminDocument } from "../../models/admin";
import User from '../../models/user'
import { UserDocument } from "../../models/user";

export const adminRepo = {
    loginAdmin: async (email: string, password: string): Promise<AdminDocument | null> => {
        try {
            const admin: AdminDocument | null = await Admin.findOne({ email: email })
            console.log(admin)
            if (admin && (await admin.matchPassword(password))) {
                return admin
            }
            return null;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    fetchAllusers: async (): Promise<UserDocument[] | null> => {
        try {
            const users = await User.find({}).select('userName email isBlocked').lean();
            return users || null;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    blockUser:async(userId:string)=>{
        try {
            const user = await User.findById(userId)
            if(!user){
                throw new Error('user not found')
            }
            user.isBlocked = !user.isBlocked
            await user.save()            
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}