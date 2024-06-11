import { PostData, commentData, replyData, reportData } from "../../../../../types/user/post";
import Comment from "../../models/comment";
import Like from "../../models/likes";
import Post from "../../models/post";
import Replay from "../../models/replies";
import Report from "../../models/report";



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
            return await Post.find({isBlocked:false})
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
    editPost: async (data: PostData) => {
        try {
            const { _id, ...updateData } = data;
            const updatedPost = await Post.findByIdAndUpdate(_id, updateData, { new: true });
            if (!updatedPost) {
                throw new Error('Post not found');
            }
            return;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getAllComments: async (postId: string) => {
        try {
            console.log('inside getAllcomments repo');
            const comments: any = await Comment.find({ postId })
                .populate('userId', 'userName profilePic')
                .lean();

            for (const comment of comments) {
                comment.replies = await postRepo.fetchReplies(comment._id);
            }

            // console.log(comments);
            return comments
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    fetchReplies: async (commentId: string, parentId: string | null = null) => {
        try {
            const replies: any = await Replay.find({ commentId, parentId })
                .populate('userId', 'userName profilePic')
                .lean();

            for (const reply of replies) {
                reply.replay = await postRepo.fetchReplies(commentId, reply._id);
            }

            return replies;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    addCommentRepo: async (data: commentData) => {
        try {
            const newComment = await Comment.create({
                postId: data.postId,
                userId: data.userId,
                content: data.newComment
            })
            newComment.save()
            return

        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    addReply: async (data: replyData) => {
        try {
            const { reply, commentId, userId, parentId } = data;
            const newReply = new Replay({
                commentId,
                userId,
                reply,
                parentId: parentId || null,
            });
            await newReply.save();
            return

        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    likePost: async (userId: string, postId: string) => {
        try {
            let like = await Like.findOne({ postId });
            let action: string;

            if (!like) {
                like = await Like.create({
                    postId,
                    likedUsers: [userId],
                });
                action = 'Liked';
            } else {
                const isLiked = like.likedUsers.includes(userId as any);
                if (isLiked) {

                    await like.updateOne({ $pull: { likedUsers: userId } });
                    action = 'Unliked';
                } else {

                    await like.updateOne({ $addToSet: { likedUsers: userId } });
                    action = 'Liked';
                }

            }
            // Re-fetch to get the latest count ========
            const likes: any = await Like.findOne({ postId });
            const likeCount: number = likes.likedUsers.length;
            console.log({ likeCount });
            return { action, likeCount };
        } catch (error) {
            console.error('Error in likePost:', error);
            throw new Error((error as Error).message);
        }
    },
    getLikeCount: async (postId: string) => {
        try {
            const like = await Like.findOne({ postId }).select('likedUsers');
            if (like) {
                return like.likedUsers.length;
            } else {
                return 0;
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    likeStatusRepo: async (postId: string, userId: string) => {
        try {
            const like = await Like.findOne({ postId });
            const likeCount = like?.likedUsers.length
            if (!like) {
                return { isLiked: false, likeCount };
            }
            const isLiked = like.likedUsers.includes(userId as any);
            return { isLiked, likeCount };

        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    reportRepo: async (data: reportData) => {
        const {postId,userId,reason,additionalReason} = data
        try {   
            console.log('inside repo')
            console.log(data)
            const report = await Report.findOne({postId})
            if (!report) {
                await Report.create({
                    postId,
                    users: [{ userId, reason, additionalReason }],
                    });
                    return 'reported'
                    } else {
                 
                const userReport = report.users.find(user => user.userId.toString() === userId);
          
                if (userReport) {
                //   userReport.reason = reason;
                //   userReport.additionalReason = additionalReason;
                return 'already reported'
                } else {
                  report.users.push({ userId, reason, additionalReason });
                }          
                await report.save();
                return 'Report submitted successfully'
              }
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}