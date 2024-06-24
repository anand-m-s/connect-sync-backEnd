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
exports.adminUserUsecases = void 0;
const adminRepoMongodb_1 = require("../../../frameworks/database/mongodb/repositories/admin/adminRepoMongodb");
exports.adminUserUsecases = {
    fetchAllUser: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield adminRepoMongodb_1.adminRepo.fetchAllusers();
            return allUsers;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    blockUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const status = yield adminRepoMongodb_1.adminRepo.blockUser(userId);
            return status;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getReportUseCase: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepoMongodb_1.adminRepo.getReportRepo();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    blockPostUseCase: (postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield adminRepoMongodb_1.adminRepo.blockPostRepo(postId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
