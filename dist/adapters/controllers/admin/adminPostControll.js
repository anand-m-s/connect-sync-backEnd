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
exports.adminPostManagment = void 0;
const adminUserUsecases_1 = require("../../../app/usecases/admin/adminUserUsecases");
exports.adminPostManagment = {
    report: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reports = yield adminUserUsecases_1.adminUserUsecases.getReportUseCase();
            res.json(reports);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    blockPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postId = req.query.postId;
            console.log(postId);
            const status = yield adminUserUsecases_1.adminUserUsecases.blockPostUseCase(postId);
            res.json(status);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
