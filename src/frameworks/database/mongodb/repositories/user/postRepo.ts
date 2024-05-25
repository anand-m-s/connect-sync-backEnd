import { PostData } from "../../../../../types/user/common";
import Post from "../../models/post";


export const postRepo ={
    savePost:async(data:PostData)=>{
        const post = new Post({
            ...data
        })        
        return post.save()
    },
    getAllPost:async(id:string)=>{
        try {
            return await Post.find({ userId: id }).lean();
        } catch (error) {
            throw new Error((error as Error).message)
        }

    },
    
}