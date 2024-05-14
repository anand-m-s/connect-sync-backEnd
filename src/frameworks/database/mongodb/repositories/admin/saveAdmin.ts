import { Admin,AdminDocument } from "../../models/admin";

export const saveAdmin =async(data:AdminDocument)=>{
    try {
        const admin= new Admin({
          ...data
        })
        return await admin.save()
      } catch (error) {
        throw new Error((error as Error).message)
      }
}