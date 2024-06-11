

export interface PostData {
    _id:string;
    userId: string;
    location: string;
    description: string;
    imageUrl: string[];
  }

export interface commentData{
  _id:string;
  userId:string;
  postId:string;
  newComment:string;
}
export interface replyData{
  _id:string;
  commentId:string;
  userId:string;
  reply:string;
  parentId:string;
}
export interface reportData{

  postId:string;
  userId:any;
  reason:string;
  additionalReason:string;
}