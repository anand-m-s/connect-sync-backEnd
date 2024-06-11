import { Admin } from "../../models/admin";
import { AdminDocument } from "../../models/admin";
import Post from "../../models/post";
import Report from "../../models/report";
import User from '../../models/user'
import { UserDocument } from "../../models/user";

export const adminRepo = {
    loginAdmin: async (email: string, password: string): Promise<AdminDocument | null> => {
        try {
            const admin: AdminDocument | null = await Admin.findOne({ email: email })
            console.log(admin)
            if (admin && (await admin.matchPassword(password))) {
                return admin
            }
            return null;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    fetchAllusers: async (): Promise<UserDocument[] | null> => {
        try {
            const users = await User.find({}).select('userName email isBlocked profilePic').lean();
            return users || null;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    blockUser: async (userId: string) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                throw new Error('user not found')
            }
            user.isBlocked = !user.isBlocked
            await user.save()
            return user.isBlocked ? 'user blocked' : 'unblocked'
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getReportRepo: async () => {
        try {
            const reports = await Report.find({})
                .populate({
                    path: 'postId',
                    populate: {
                        path: 'userId',
                        select: 'userName profilePic',
                    },
                    select: 'imageUrl isBlocked',
                })
                .populate({
                    path: 'users.userId',
                    select: 'userName profilePic',
                });
            // console.log(reports!)
            return reports;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    blockPostRepo: async (postId: string) => {
        try {
            const post = await Post.findById(postId);

            if (!post) {
                throw new Error('Post not found');
            }              
            post.isBlocked = !post.isBlocked;
            await post.save();    
            // console.log(post);
            return {
                success: true,
                message: `Post ${post.isBlocked ? 'blocked' : 'unblocked'} successfully`
            };
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}