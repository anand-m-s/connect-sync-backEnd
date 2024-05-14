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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const userChecker_1 = require("../utils/userChecker");
const saveUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield (0, userChecker_1.checkExistingUser)(data.email, data.userName);
        if (existingUser) {
            // Handle the case where the user already exists
            // You might want to throw an error or return a specific message
            throw new Error("A user with that email or username already exists.");
        }
        const user = new user_1.default(Object.assign({}, data));
        return yield user.save();
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.saveUser = saveUser;
