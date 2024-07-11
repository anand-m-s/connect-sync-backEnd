import mongoose, { Schema, Document } from "mongoose";

export interface TransactionDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    amount: number;
    paymentId: string;
    paymentMethod: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema: Schema<TransactionDocument> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },     
        paymentId: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "completed", "failed"],
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model<TransactionDocument>("Transaction", transactionSchema);

export default Transaction;
