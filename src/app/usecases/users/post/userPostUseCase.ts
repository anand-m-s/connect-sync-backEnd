
import { PostData, replyData, reportData, savedPost } from "../../../../types/user/post"
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
    userFeedPost: async (perPage: string, page: string, userId: string) => {
        try {
            const perPageNum = parseInt(perPage, 10);
            const pageNum = parseInt(page, 10);
            const posts = await postRepo.getUsersPost(perPageNum, pageNum);
            const savedPosts = await postRepo.getSavedPostsRepo(userId)
            const savedPostIds = savedPosts.map(savedPost => (savedPost.postId as any)._id.toString());
            // console.log(savedPosts)
            const enrichedPosts = await Promise.all(posts.map(async post => {
                const { _id, users, imageUrl, location, description, likes } = post;
                const { userName, profilePic } = users;
                const comments = await postRepo.getAllComments(_id);
                const isSaved = savedPostIds.includes(_id.toString());
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
                    comments,
                    isSaved

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
    addCommentUseCase: async (data: commentData, userId: string) => {
        try {
            return await postRepo.addCommentRepo(data, userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getComment: async (postId: string) => {
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
    },
    savedPostUseCase: async (data: savedPost) => {
        try {
            return await postRepo.savedPost(data)

        } catch (error) {
        }
    },
    getSavedPost: async (id: string) => {
        try {
            return await postRepo.getSavedPostsRepo(id)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

}