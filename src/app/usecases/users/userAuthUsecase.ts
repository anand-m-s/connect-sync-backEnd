
import { userRegisterInterface } from "../../../types/userRegisterInterface.js"
import { saveUser } from "../../../frameworks/database/mongodb/repositories/userRepoMongoDb.js"



export default{
    registerUser:async(data: userRegisterInterface)=>{
        try {
            const savedUser = await saveUser(data)
            const user ={
                _id:savedUser._id,
                userName:savedUser.userName,
                email:savedUser.email,
                phone:savedUser.phone,
            }
            return {user}
            
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}