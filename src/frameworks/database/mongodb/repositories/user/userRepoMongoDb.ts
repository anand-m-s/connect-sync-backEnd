import { userRegisterInterface, verifiedTagInterface } from "../../../../../types/user/userRegisterInterface";
import User, { UserDocument } from "../../models/user";
import { checkExistingUser } from "../../utils/userChecker";
import bcrypt from 'bcrypt'
import Connection from "../../models/connections";
import Transaction from "../../models/transaction";
import { BadRequestException, InternalServerErrorException } from "../../../../../errors/HttpExeption";


export const saveUser = async (data: userRegisterInterface) => {
    try {

        const existingUser = await checkExistingUser(data.email, data.userName)
        if (existingUser?.isVerified) {
            throw new BadRequestException('User already exists');
        }
        if (existingUser && !existingUser.isVerified) {
            let verifyUser = {
                _id: existingUser?.id,
                email: existingUser?.email,
                userName: existingUser?.userName
            }
            return verifyUser
        }

        const user = new User({
            ...data,
        })

        return await user.save()
    } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
    }
}
export const saveUserGoogle = async (data: userRegisterInterface) => {
    try {
        const existingUser = await checkExistingUser(data.email, data.userName)
        if (existingUser?.isBlocked) {
            throw new Error('user Blocked')
        }
        if (existingUser) {
            if (existingUser.isGoogle) {
                let user = {
                    id: existingUser.id,
                    email: existingUser.email,
                    userName: existingUser.userName,
                    profilePic: existingUser.profilePic,
                    verified: existingUser?.verifiedTag,
                    verifiedExp: existingUser?.verifiedTagPurchasedAt
                }
                return user
            } else {
                throw new Error("user already exists with this email.");
            }
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        const hashedPassword = await bcrypt.hash(randomPassword, 10)
        const newUser = await User.create({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            isGoogle: true,
            profilePic: data.profilePic,
        })
        await Connection.create({
            userId: newUser._id
        })

        return newUser
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const updatePassword = async (password: string, email: string) => {
    try {
        console.log(password, email)
        const user: any = await User.findOne({ email })
        user.password = password
        await user.save()
        return { message: 'Password updated successfully' };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const verifyTagRepo = async (data: verifiedTagInterface, userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        const currentDate = new Date();
        const oneYearAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));

        if (user.verifiedTagPurchasedAt && user.verifiedTagPurchasedAt > oneYearAgo) {
            throw new BadRequestException("User has already purchased the verified tag ,the deducted amount will be refunded :)");
        }

        const transaction = new Transaction({
            userId: userId,
            amount: data.amount,
            paymentId: data.paymentId,
            paymentMethod: data.payment,
            status: "completed",
        });

        await transaction.save();
        await User.findByIdAndUpdate(userId, {
            $set: {
                verifiedTag: true,
                verifiedTagPurchasedAt: new Date(),
            },
        });
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error;
        } else {
            throw new InternalServerErrorException((error as Error).message);
        }
    }
};


































// export const verifyTagRepo = async (data: verifiedTagInterface, userId: string) => {
//     try {

//        const transaction = new Transaction({
//             userId: userId,
//             amount: data.amount,
//             paymentId: data.paymentId,
//             paymentMethod: data.payment,
//             status: "completed",
//         });
//         await transaction.save();
//         await User.findByIdAndUpdate(userId, {
//             $set: {
//                 verifiedTag: true,
//                 verifiedTagPurchasedAt: new Date(),
//             },
//         });
//     } catch (error) {
//         throw new Error((error as Error).message);
//     }
// };
