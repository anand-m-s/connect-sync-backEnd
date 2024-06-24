"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../../../adapters/controllers/admin/adminAuthController"));
const adminUserManagment_1 = require("../../../adapters/controllers/admin/adminUserManagment");
const adminAuth_1 = require("../middleware/adminAuth");
const adminPostControll_1 = require("../../../adapters/controllers/admin/adminPostControll");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post('/register', adminAuthController_1.default.registerAdmin);
exports.adminRouter.post('/login', adminAuthController_1.default.loginAdmin);
exports.adminRouter.get('/fetchUserData', adminAuth_1.protectAdmin, adminUserManagment_1.adminUserManagment.fetchUserData);
exports.adminRouter.post('/block', adminAuth_1.protectAdmin, adminUserManagment_1.adminUserManagment.userBlock);
exports.adminRouter.get('/getReport', adminAuth_1.protectAdmin, adminPostControll_1.adminPostManagment.report);
exports.adminRouter.post('/blockReportedPost', adminAuth_1.protectAdmin, adminPostControll_1.adminPostManagment.blockPost);
