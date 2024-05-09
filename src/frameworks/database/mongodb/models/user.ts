import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt"

export interface UserDocument extends Document {
    email: string;
    userName: string;
    password: string;
    phone: string | null;
    isBlocked: boolean;
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
            required: true
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
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

userSchema.methods.matchPassword = async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema);

export default User;

