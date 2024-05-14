import { AdminDocument } from "../../../frameworks/database/mongodb/models/admin";
import { saveAdmin} from "../../../frameworks/database/mongodb/repositories/admin/saveAdmin";

export default {
    registerAdmin: async(data:AdminDocument)=>{
        try {
            const saveAdmi = await saveAdmin(data)
            return saveAdmi
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}