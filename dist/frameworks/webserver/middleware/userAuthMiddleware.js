"use strict";
// import { NextFunction,Response,Request } from "express";
// import jwt from 'jsonwebtoken'
// import User from "../../database/mongodb/models/user";
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
exports.protectUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../database/mongodb/models/user"));
const protectUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.header("Authorization");
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            const userId = req.user.userId;
            let user = yield user_1.default.findOne({ _id: userId });
            if (!user) {
                res.status(401).json({ message: "User not found" });
                return;
            }
            if (user.isBlocked) {
                res.status(401).json({ message: "User Is Blocked" });
                return;
            }
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Not authorized Invalid token" });
        }
    }
    else {
        res.status(401).json({ message: "Not authorized no token" });
    }
});
exports.protectUser = protectUser;
