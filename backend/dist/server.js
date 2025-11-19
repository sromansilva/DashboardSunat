"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./config/env"));
const logger_1 = __importDefault(require("./utils/logger"));
const prisma_1 = __importDefault(require("./config/prisma"));
const server = app_1.default.listen(env_1.default.PORT, () => {
    logger_1.default.info(`API corriendo en http://localhost:${env_1.default.PORT}`);
});
const shutdown = async () => {
    logger_1.default.info('Apagando servidor...');
    server.close();
    await prisma_1.default.$disconnect();
    process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
//# sourceMappingURL=server.js.map