
import { PostData } from "../../../../types/user/common"
import { postRepo } from "../../../../frameworks/database/mongodb/repositories/user/postRepo"


export default{
    userPostSave:async(data:PostData)=>{
        try {
            const post = await postRepo.savePost(data)
            console.log(post)
            return post

            
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserPostUseCase:async(id:string)=>{
        try {
            const allPost = await postRepo.getAllPost(id);
        
            return allPost;
            
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    
}