
import mongoose from 'mongoose';

export interface FollowerInterface {
  _id: mongoose.Schema.Types.ObjectId;
  userName: string;
  profilePic: string;
}

export interface NotificationInterface {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  type: 'like' | 'comment' | 'follow';
  post?: mongoose.Schema.Types.ObjectId;
  comment?: mongoose.Schema.Types.ObjectId;
  follower?: FollowerInterface;
  content: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface verifiedTagInterface{
  payment:string;
  paymentId:string;
  amount:number;
}

export interface userRegisterInterface{
    email:string;
    userName:string;
    password:string;
    phone:string;
    profilePic:string;
    verified:boolean,
    verifiedExp:Date;
}

export interface connectionInterface{
    
}