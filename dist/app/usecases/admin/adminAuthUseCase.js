"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const saveAdmin_1 = require("../../../frameworks/database/mongodb/repositories/admin/saveAdmin");
const adminRepoMongodb_1 = require("../../../frameworks/database/mongodb/repositories/admin/adminRepoMongodb");
const generateToken_1 = require("../../utils/generateToken");
exports.default = {
    registerAdmin: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const saveAdmi = yield (0, saveAdmin_1.saveAdmin)(data);
            return saveAdmi;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    adminLogin: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admin = yield adminRepoMongodb_1.adminRepo.loginAdmin(email, password);
            console.log(admin);
            if (!admin) {
                throw new Error('Invalid email or password');
            }
            return {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                message: 'Login successful',
                token: (0, generateToken_1.generateToken)(admin.id)
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
