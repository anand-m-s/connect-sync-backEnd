import express from "express"
import connectDB from "./frameworks/database/mongodb/connection"
import serverConfig from "./frameworks/webserver/server"
import expressConfig from "./frameworks/webserver/express"
import {userRouter} from './frameworks/webserver/routes/user'
import http from "http"
import colors from 'colors.ts'


colors?.enable()

const app = express()
const server = http.createServer(app)

connectDB()

expressConfig(app)

//routes for each endpoint
app.use('/api',userRouter)

serverConfig(server).startServer();

