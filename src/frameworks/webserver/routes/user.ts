import express from 'express'
import userAuthController from '../../../adapters/controllers/user/userAuthController'

export const userRouter = express.Router()

userRouter.post('/register', userAuthController.registerUser)
userRouter.post('/verifyOtp',userAuthController.verifyOtp)
userRouter.post('/login',userAuthController.loginUser)
userRouter.post('/googleAUth',userAuthController.googleAuth)
