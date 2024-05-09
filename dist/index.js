"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const user_1 = require("./frameworks/webserver/routes/user");
const http_1 = __importDefault(require("http"));
const colors_ts_1 = __importDefault(require("colors.ts"));
colors_ts_1.default === null || colors_ts_1.default === void 0 ? void 0 : colors_ts_1.default.enable();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, connection_1.default)();
(0, express_2.default)(app);
//routes for each endpoint
app.use('/api', user_1.userRouter);
(0, server_1.default)(server).startServer();
//# sourceMappingURL=index.js.map