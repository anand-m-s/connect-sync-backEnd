import express from 'express'
import userAuthController from '../../../adapters/controllers/user/userAuthController'
import userPostController from '../../../adapters/controllers/user/userPostController'
import { protectUser } from '../middleware/userAuthMiddleware'
export const userRouter = express.Router()

userRouter.post('/register', userAuthController.registerUser)
userRouter.post('/verifyOtp',userAuthController.verifyOtp)
userRouter.post('/login',userAuthController.loginUser)
userRouter.post('/googleAUth',userAuthController.googleAuth)
userRouter.post('/resendOtp',userAuthController.resendOtp)
userRouter.post('/savePost',protectUser,userPostController.savePost)
userRouter.get('/getUserPost',protectUser,userPostController.getUserPost)
userRouter.put('/editProfile',protectUser,userAuthController.updateProfile)
userRouter.get('/getUserDetails',userAuthController.getUserDetails)
