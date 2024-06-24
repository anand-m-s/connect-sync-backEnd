"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const user_1 = require("./frameworks/webserver/routes/user");
const admin_1 = require("./frameworks/webserver/routes/admin");
const chat_1 = require("./frameworks/webserver/routes/chat");
const http_1 = __importDefault(require("http"));
const colors_ts_1 = __importDefault(require("colors.ts"));
const socket_io_1 = require("socket.io");
colors_ts_1.default === null || colors_ts_1.default === void 0 ? void 0 : colors_ts_1.default.enable();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    },
});
io.on("connection", (socket) => {
    console.log('connected to socket.io');
    socket.on('setup', (userData) => {
        socket.join(userData.id);
        socket.emit('connected');
    });
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined room : ', room);
    });
    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if (!chat.users)
            return console.log('chat.users not defined');
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id)
                return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));
});
(0, connection_1.default)();
(0, express_2.default)(app);
app.use('/api', user_1.userRouter);
app.use('/api/admin', admin_1.adminRouter);
app.use('/api/chat', chat_1.chatRouter);
(0, server_1.default)(server).startServer();
