"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userAuthController_1 = __importDefault(require("../../../adapters/controllers/user/userAuthController"));
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/register', userAuthController_1.default.registerUser);
//# sourceMappingURL=user.js.map