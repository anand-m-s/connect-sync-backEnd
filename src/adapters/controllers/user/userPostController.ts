import { Request, Response } from "express"
import userPostUseCase from "../../../app/usecases/users/post/userPostUseCase"
import { commentData } from "../../../types/user/post"

export default {
    savePost: async (req: Request, res: Response) => {
        try {
            console.log('inside post controller')
            console.log(req.body)
            await userPostUseCase.userPostSave(req.body)
            res.status(200).json({ message: 'post uploaded success' })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    getUserPost: async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                return res.status(400).json({ error: 'Missing id parameter' });
            }
            const post = await userPostUseCase.getUserPostUseCase(id);
            res.status(200).json({ message: 'Data fetched', post });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    userFeedPost: async (req: Request, res: Response) => {
        try {
            const perPage = req.query.perPage as string;
            const page = req.query.page as string;
            res.status(200).json(await userPostUseCase.userFeedPost(perPage,page))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    deletePost: async (req: Request, res: Response) => {
        try {
            const { postId } = req.params;
            console.log(postId, 'postId')
            res.status(200).json(await userPostUseCase.deletePostUseCase(postId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    editPost: async (req: Request, res: Response) => {
        try {
            res.status(200).json(await userPostUseCase.editPostUseCase(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    allComments: async (req: Request, res: Response) => {
        try {
            const postId = req.query.postId as string
            const comments = await userPostUseCase.getAllComments(postId)
            // console.log(comments)
            res.status(200).json(comments)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    addComment: async (req: Request, res: Response) => {
        try {
            const data = req.body
            console.log(data)
            await userPostUseCase.addCommentUseCase(data)
            res.status(200).json({ message: 'comment added succesfully' })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    addReply: async (req: Request, res: Response) => {
        try {
            const data = req.body
            console.log(data)
            await userPostUseCase.replyUseCase(data)
            res.status(200).json({ message: 'comment added succesfully' })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    postLike: async (req: Request, res: Response) => {
        try {
            const userId = req.user.userId
            const postId = req.query.postId as string;
            console.log(userId, postId)
            const { action, likeCount } = await userPostUseCase.likePost(userId, postId)
            res.status(200).json({ action, likeCount })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
            res.status(500).json({ error: (error as Error).message })
        }
    },
    isLiked: async (req: Request, res: Response) => {
        try {
            const postId = req.query.postId as string
            const userId = req.user.userId
            console.log(postId)
            const status = await userPostUseCase.likeStatusUseCase(postId, userId)
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })

        }
    },
    postReport: async (req: Request, res: Response) => {
        try {
            const userId = req.user.userId; // assuming `req.user` is populated by `protectUser` middleware
            const { postId, reason, additionalReason } = req.body;
            const data  ={
                postId,
                reason,
                additionalReason,
                userId
            }
            console.log(data)
            const report = await userPostUseCase.reportUseCase(data);
            console.log(report)        
            res.status(200).json({ message: report });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }


}