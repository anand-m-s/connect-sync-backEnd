"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const expressConfig = (app) => {
    const sessionSecret = process.env.SESSION_SECRET || "default_secret_key";
    app.use((0, express_session_1.default)({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        }
    }));
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173",
        credentials: true
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.default = expressConfig;
