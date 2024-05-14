"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.PORT || 5000;
const serverConfig = (server) => {
    const startServer = () => {
        server.listen(port, () => {
            console.log(`server listen on ${port}`.bg_blue.bold);
        });
    };
    return {
        startServer
    };
};
exports.default = serverConfig;
