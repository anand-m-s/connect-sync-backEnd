import express from 'express'
import adminAuthController from '../../../adapters/controllers/admin/adminAuthController'
import { adminUserManagment } from '../../../adapters/controllers/admin/adminUserManagment'
export const adminRouter = express.Router()


adminRouter.post('/register',adminAuthController.registerAdmin)
adminRouter.post('/login',adminAuthController.loginAdmin)
adminRouter.get('/fetchUserData',adminUserManagment.fetchUserData)
adminRouter.post('/block',adminUserManagment.userBlock)




