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
exports.adminUserManagment = void 0;
const adminUserUsecases_1 = require("../../../app/usecases/admin/adminUserUsecases");
exports.adminUserManagment = {
    fetchUserData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield adminUserUsecases_1.adminUserUsecases.fetchAllUser();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    userBlock: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.query.id;
            console.log(userId);
            if (typeof userId !== 'string') {
                throw new Error('Invalid userId');
            }
            const status = yield adminUserUsecases_1.adminUserUsecases.blockUser(userId);
            console.log(status);
            res.json({ message: status });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};
