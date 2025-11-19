"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("./config/cors"));
const routes_1 = __importDefault(require("./routes"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const errorHandler_1 = require("./middlewares/errorHandler");
const prisma_1 = __importDefault(require("./config/prisma"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(cors_1.default);
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', async (_req, res) => {
    try {
        await prisma_1.default.$queryRaw `SELECT 1`;
        return res.json({ success: true, data: { status: 'ok', db: 'connected' } });
    }
    catch (error) {
        return res.status(503).json({ success: false, message: 'DB disconnected', details: error });
    }
});
app.use('/api/v1', routes_1.default);
app.use(notFound_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map