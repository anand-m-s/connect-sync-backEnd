import { PostData, commentData, replyData } from "../../../../../types/user/post";
import Comment from "../../models/comment";
import Post from "../../models/post";
import Replay from "../../models/replies";



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
     getAllComments : async (postId: string) => {
        try {
            console.log('inside getAllcomments repo');
            const comments:any = await Comment.find({ postId })
                .populate('userId', 'userName profilePic')
                .lean();
    
            for (const comment of comments) {
                comment.replies = await postRepo.fetchReplies(comment._id);
            }
    
            console.log(comments);
            return comments
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },    
     fetchReplies : async (commentId: string, parentId: string | null = null) => {
        try {
            const replies:any = await Replay.find({ commentId, parentId })
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
    addCommentRepo:async(data:commentData)=>{
        try {
            const newComment = await Comment.create({
                postId:data.postId,
                userId:data.userId,
                content:data.newComment
            })
            newComment.save()
            return

        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    addReply:async(data:replyData)=>{
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
}