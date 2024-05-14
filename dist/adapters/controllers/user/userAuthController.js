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
const userAuthUsecase_1 = __importDefault(require("../../../app/usecases/users/userAuthUsecase"));
exports.default = {
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userAuthUsecase_1.default.registerUser(req.body, req);
            res.status(200).json({ message: "User registered successfully", user });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    verifyOtp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const { user, token } = yield userAuthUsecase_1.default.verifyUser(email, req);
            console.log(user);
            console.log(token);
            res.status(200).json({ message: 'OTP verified', user, token });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield userAuthUsecase_1.default.loginUser(email, password);
            console.log({ user });
            res.status(200).json({ message: 'logged in success',
                user
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};
