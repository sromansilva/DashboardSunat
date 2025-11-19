"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedPing = exports.testDbConnection = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const database_1 = require("../database");
const response_1 = require("../utils/response");
exports.testDbConnection = (0, asyncHandler_1.default)(async (_req, res) => {
    var _a, _b;
    const result = await database_1.prisma.$queryRaw `SELECT NOW() as now`;
    return (0, response_1.sendSuccess)(res, { timestamp: (_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.now) !== null && _b !== void 0 ? _b : null }, 'Conexión a Neon OK');
});
exports.protectedPing = (0, asyncHandler_1.default)(async (req, res) => {
    return (0, response_1.sendSuccess)(res, { user: req.user }, 'Acceso autorizado');
});
//# sourceMappingURL=system.controller.js.map