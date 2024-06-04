export interface chatInterface {
    id: string;
    chatName: string;
    isGroupChat: boolean;
    users: string[];
    latestMessage: string[];
    groupAdmins: string[];
  }

export interface messageInterface {
  sender:string;
  content:string;
  chat:string;
}

