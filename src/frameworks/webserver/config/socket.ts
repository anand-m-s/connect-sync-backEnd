import { Server } from "socket.io";
import { Server as HTTPServer } from "http";

const onlineUsers = new Map();

type UserData = {
    id: string;
    userName?: string;
    email?: string;
};
declare module "socket.io" {
    interface Socket {
        userData?: UserData;
    }
}

export default function initializeSocket(server: HTTPServer): Server {
    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {
        socket.on('setup', (userData) => {
            console.log('User Connected');
            socket.join(userData.id);
            socket.userData = userData;
            onlineUsers.set(userData.id, userData);
            io.emit('user-connected', { id: userData.id, userName: userData.userName, profilePic: userData.profilePic });
            socket.emit('current-online-users', Array.from(onlineUsers.values()));
            socket.emit('connected', { socketId: socket.id });
        });

        socket.on('join chat', (room) => {
            socket.join(room);
            console.log('user joined room : ', room);
        });

        socket.on('join video chat', ({ roomId }) => {
            socket.join(roomId);
            console.log(`joined video chat room: ${roomId}`);
        });

        socket.on('video-call', ({ roomId, callerId, recipientId }) => {       
            socket.join(roomId);
            socket.to(recipientId).emit('video-call', { roomId, callerId });
            console.log(`user ${callerId} initiated video call to ${recipientId} in room: ${roomId}`);
        });

        socket.on('new message', (newMessageRecieved) => {
            console.log(newMessageRecieved)

            let chat = newMessageRecieved.chat;
            if (!chat.users) return console.log('chat.users not defined');
            chat.users.forEach((user: any) => {
                if (user._id == newMessageRecieved.sender._id) return;
                socket.in(user._id).emit("message recieved", newMessageRecieved);
            });
        });

        socket.on("typing", (room) => socket.in(room).emit("typing"));
        socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));

        //==== Handle WebRTC signaling messages=====
        socket.on('webrtc-offer', (data) => {
            socket.to(data.roomId).emit('webrtc-offer', data);
        });

        socket.on('webrtc-answer', (data) => {
            socket.to(data.roomId).emit('webrtc-answer', data);
        });

        socket.on('webrtc-ice-candidate', (data) => {
            socket.to(data.roomId).emit('webrtc-ice-candidate', data);
        });

        socket.on('call-ended', (data) => {
            socket.to(data.roomId).emit('call-ended', data);
        });



          // =====Listen for like events======
          socket.on('like', ({ postId, liker, postOwnerId }) => {
            console.log('inside like socket')
            console.log(postId,liker,postOwnerId)
            socket.to(postOwnerId).emit('liked', { postId, liker,postOwnerId });
        });

        //=comment
        socket.on('comment',({postId,commentedBy,postOwnerId})=>{
            console.log('inside comment socket')
            console.log(postId,commentedBy,postOwnerId)
            socket.to(postOwnerId).emit('commented',{postId,commentedBy,postOwnerId})
        })

        //===followed===

        socket.on('followed',({userId,followedBy})=>{
            console.log(userId)
            console.log(followedBy)
            socket.to(userId).emit('followers',{followedBy})
        })

        socket.on('user-disconnected', (data) => {
            // console.log(`USER DISCONNECTED: ${data.id}`);
            onlineUsers.delete(data.id);
            io.emit('user-disconnected', data);
        });

        socket.on("disconnect", () => {
            console.log("USER DISCONNECTED");
            if (socket.userData && socket.userData.id) {
                onlineUsers.delete(socket.userData.id);
                io.emit('user-disconnected', { id: socket.userData.id });
                socket.leave(socket.userData.id);
            }
        });
    });

    return io;
}
