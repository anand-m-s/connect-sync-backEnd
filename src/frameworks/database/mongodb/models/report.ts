import mongoose, { Schema, Document } from "mongoose";

export interface ReportInterface extends Document {
  postId: Schema.Types.ObjectId;
  users: UsersInterface[];
}

interface UsersInterface {
  userId: Schema.Types.ObjectId;
  reason: string;
  additionalReason: string;
}

const usersSchema: Schema<UsersInterface> = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref:'User'
  },
  reason: {
    type: String,
    required: true,
  },
  additionalReason: {
    type: String,
  },
});

const reportSchema: Schema<ReportInterface> = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    users: [usersSchema],
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model<ReportInterface>("Report", reportSchema);

export default Report;
