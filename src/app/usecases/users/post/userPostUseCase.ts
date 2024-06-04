
import { PostData } from "../../../../types/user/common"
import { postRepo } from "../../../../frameworks/database/mongodb/repositories/user/postRepo"


export default {
    userPostSave: async (data: PostData) => {
        try {
            const post = await postRepo.savePost(data)
            console.log(post)
            return post


        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserPostUseCase: async (id: string) => {
        try {
            const allPost = await postRepo.getAllPost(id);

            return allPost;

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    userFeedPost: async () => {
        try {
            const posts = await postRepo.getUsersPost()
            return posts.map(post => {
                const { _id, userId, imageUrl, location, description } = post;
                const { userName, profilePic } = userId
                return { _id, userId: userId._id, userName, profilePic, imageUrl, location, description };
            })
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    deletePostUseCase: async (postId: string) => {
        try {
            return await postRepo.deletePost(postId)
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    editPostUseCase: async (data:PostData) => {
        try {
            console.log(data)
            return await postRepo.editPost(data)
            
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },

}