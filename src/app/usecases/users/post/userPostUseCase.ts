
import { PostData, replyData, reportData } from "../../../../types/user/post"
import { postRepo } from "../../../../frameworks/database/mongodb/repositories/user/postRepo"
import { commentData } from "../../../../types/user/post"

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
    userFeedPost: async (perPage: string, page: string) => {
        try {
            // const perPageNum = parseInt(perPage, 10);
            // const pageNum = parseInt(page, 10);
            // const posts = await postRepo.getUsersPost(perPageNum,pageNum)
            // // console.log({posts})
            // return posts.map(post => {
            //     const { _id, userId, imageUrl, location, description } = post;
            //     const { userName, profilePic } = userId
            //     return { _id, userId: userId._id, userName, profilePic, imageUrl, location, description };
            // })
            const perPageNum = parseInt(perPage, 10);
            const pageNum = parseInt(page, 10);
            const posts = await postRepo.getUsersPost(perPageNum, pageNum);
            // console.log(posts)  
            const enrichedPosts = await Promise.all(posts.map(async post => {
                const { _id, users, imageUrl, location, description, likes } = post;
                const { userName, profilePic } = users;
                const comments = await postRepo.getAllComments(_id);
                return {
                    _id,
                    userId: users._id,
                    userName,
                    profilePic,
                    imageUrl,
                    location,
                    description,
                    likesCount: likes.length,
                    commentsCount: comments.length,
                    likedUsers: likes.map((like: { likedUsers: any }) => like.likedUsers).flat(),
                    comments
                };
            }));

            return enrichedPosts;
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
    editPostUseCase: async (data: PostData) => {
        try {
            console.log(data)
            return await postRepo.editPost(data)

        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    getAllComments: async (postId: string) => {
        try {

            return await postRepo.getAllComments(postId)

        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    addCommentUseCase: async (data: commentData,userId:string) => {
        try {
            return await postRepo.addCommentRepo(data,userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getComment:async(postId:string)=>{
        try {
            return await postRepo.getAllComments(postId)
            
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    replyUseCase: async (data: replyData) => {
        try {
            return await postRepo.addReply(data)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    likePost: async (userId: string, postId: string) => {
        try {
            return await postRepo.likePost(userId, postId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    likeStatusUseCase: async (postId: string, userId: string) => {
        try {
            return await postRepo.likeStatusRepo(postId, userId)

        } catch (error) {

            throw new Error((error as Error).message)
        }
    },
    reportUseCase: async (data: reportData) => {
        try {
            console.log('inside use case')
            return await postRepo.reportRepo(data);
        } catch (error) {

            throw new Error((error as Error).message)
        }
    }

}