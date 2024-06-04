import { PostData } from "../../../../../types/user/common";
import Post from "../../models/post";


export const postRepo = {
    savePost: async (data: PostData) => {
        const post = new Post({
            ...data
        })
        return post.save()
    },
    getAllPost: async (id: string) => {
        try {
            return await Post.find({ userId: id }).lean();
        } catch (error) {
            throw new Error((error as Error).message)
        }

    },
    getUsersPost: async () => {
        try {

            return await Post.find({})
                .populate('userId', 'userName profilePic')
                .sort({ createdAt: -1 })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    deletePost: async (postId: string) => {
        try {
            await Post.findByIdAndDelete(postId)
            return
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    editPost: async (data:PostData) => {
        try {
            const { _id, ...updateData } = data;
            const updatedPost = await Post.findByIdAndUpdate(_id, updateData, { new: true });
            if (!updatedPost) {
                throw new Error('Post not found');
            }
            return ;
          
            
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

}