import express from 'express'
import adminAuthController from '../../../adapters/controllers/admin/adminAuthController'
import { adminUserManagment } from '../../../adapters/controllers/admin/adminUserManagment'
import { protectAdmin } from '../middleware/adminAuth'
import { adminPostManagment } from '../../../adapters/controllers/admin/adminPostControll'
export const adminRouter = express.Router()


adminRouter.post('/register',adminAuthController.registerAdmin)
adminRouter.post('/login',adminAuthController.loginAdmin)
adminRouter.get('/fetchUserData',protectAdmin,adminUserManagment.fetchUserData)
adminRouter.post('/block',protectAdmin,adminUserManagment.userBlock)
adminRouter.get('/getReport',protectAdmin,adminPostManagment.report)
adminRouter.post('/blockReportedPost',protectAdmin,adminPostManagment.blockPost)




