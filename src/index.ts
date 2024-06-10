import express from "express"
import connectDB from "./frameworks/database/mongodb/connection"
import serverConfig from "./frameworks/webserver/server"
import expressConfig from "./frameworks/webserver/express"
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

io.on("connection", (socket) => {
    console.log('connected to socket.io')
    socket.on('setup', (userData) => {
        socket.join(userData.id)
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log('user joined room : ', room)
    })

    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if (!chat.users) return console.log('chat.users not defined')
        chat.users.forEach((user: any) => {
            if (user._id == newMessageRecieved.sender._id) return
            socket.in(user._id).emit("message recieved", newMessageRecieved)
        });
    })

    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on('stop typing',(room)=>socket.in(room).emit("stop typing"))
})

connectDB()

expressConfig(app)

app.use('/api', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/chat', chatRouter)


serverConfig(server).startServer();

