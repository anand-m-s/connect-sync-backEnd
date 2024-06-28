import express from "express"
import connectDB from "./frameworks/database/mongodb/connection"
import serverConfig from "./frameworks/webserver/config/server"
import expressConfig from "./frameworks/webserver/config/express"
import { userRouter } from './frameworks/webserver/routes/user'
import { adminRouter } from "./frameworks/webserver/routes/admin"
import { chatRouter } from "./frameworks/webserver/routes/chat"
import http from "http"
import colors from 'colors.ts'
import { Server } from "socket.io"

colors?.enable()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    },
});

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

const onlineUsers = new Map();

io.on("connection", (socket) => {
    socket.on('setup', (userData) => {
        console.log('User Connected')
        socket.join(userData.id)
        socket.userData = userData;
        onlineUsers.set(userData.id, userData);
        io.emit('user-connected', { id: userData.id, userName: userData.userName, profilePic: userData.profilePic });
        socket.emit('current-online-users', Array.from(onlineUsers.values()));
        socket.emit('connected', { socketId: socket.id });
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log('user joined room : ', room)
    })

    socket.on('join video chat', ({ roomId }) => {
        socket.join(roomId);
        console.log(` joined video chat room: ${roomId}`);
    });

    socket.on('video-call', ({ roomId, callerId, recipientId }) => {
        console.log('inside video =- call')
        console.log(roomId)
        console.log(callerId)
        console.log(recipientId, 'recipientId')
        socket.join(roomId);
        socket.to(recipientId).emit('video-call', { roomId, callerId });
        console.log(`user ${callerId} initiated video call to ${recipientId} in room: ${roomId}`);
    });

    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if (!chat.users) return console.log('chat.users not defined')
        chat.users.forEach((user: any) => {
            if (user._id == newMessageRecieved.sender._id) return
            socket.in(user._id).emit("message recieved", newMessageRecieved)
        });
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))


    //============ Handle WebRTC signaling messages=============
    socket.on('webrtc-offer', (data) => {
        socket.to(data.roomId).emit('webrtc-offer', data);
    });

    socket.on('webrtc-answer', (data) => {
        socket.to(data.roomId).emit('webrtc-answer', data);
    });

    socket.on('webrtc-ice-candidate', (data) => {
        socket.to(data.roomId).emit('webrtc-ice-candidate', data);
    });

    // socket.on('manual-disconnect', (data) => {
    //     if (data.userId) {
    //         onlineUsers.delete(data.userId);
    //         io.emit('user-disconnected', { id: data.userId });
    //     }
    // });

    socket.on('user-disconnected', (data) => {
        console.log(`USER DISCONNECTED: ${data.id}`);
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
})

connectDB()

expressConfig(app)

app.use('/api', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/chat', chatRouter)


serverConfig(server).startServer();

