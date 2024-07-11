import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt"

export interface UserDocument extends Document {
    email: string;
    userName: string;
    password: string;
    phone: string | null;
    isBlocked: boolean;
    isVerified: boolean;
    isGoogle: boolean;
    profilePic:string;
    bio:string;   
    verifiedTag: boolean;
    verifiedTagPurchasedAt: Date | null;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<UserDocument> = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isGoogle: {
            type: Boolean,
            default: false
        }, profilePic: {
            type: String
        },
        bio:{
            type:String
        },
        verifiedTag: {
            type: Boolean,
            default: false,
        },
        verifiedTagPurchasedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true
    }
)


userSchema.pre<UserDocument>("save", async function (next) {
    if (this.password) {
        if (!this.isModified("password")) {
            next()
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.index(
    { updatedAt: 1 },
    { expireAfterSeconds: 15 * 24 * 60 * 60, partialFilterExpression: { isVerified: false } }
);

const User = mongoose.model('User', userSchema);

export default User;

