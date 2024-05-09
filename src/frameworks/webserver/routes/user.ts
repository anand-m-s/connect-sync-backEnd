import express from 'express'
import { Request, Response } from "express";
import userAuthController from '../../../adapters/controllers/user/userAuthController'

export const userRouter = express.Router()




userRouter.post('/register', userAuthController.registerUser)
