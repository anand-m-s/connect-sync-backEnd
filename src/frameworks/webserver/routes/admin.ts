import express from 'express'
import adminAuthController from '../../../adapters/controllers/admin/adminAuthController'
export const adminRouter = express.Router()

adminRouter.post('/register',adminAuthController.registerAdmin)


