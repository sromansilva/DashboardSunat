"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = exports.register = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const token_1 = require("../utils/token");
const logger_1 = __importDefault(require("../utils/logger"));
exports.register = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await (0, auth_service_1.registerUser)(req.body);
    logger_1.default.info(`Nuevo usuario registrado: ${user.email}`);
    return (0, response_1.sendSuccess)(res, user, 'Usuario registrado', 201);
});
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    const { user, tokens } = await (0, auth_service_1.loginUser)(req.body.email, req.body.password);
    return (0, response_1.sendSuccess)(res, { user, tokens }, 'Login exitoso');
});
exports.refresh = (0, asyncHandler_1.default)(async (req, res) => {
    const { refreshToken } = req.body;
    const payload = (0, token_1.verifyRefreshToken)(refreshToken);
    const tokens = await (0, auth_service_1.refreshTokens)(payload.sub, payload.role);
    return (0, response_1.sendSuccess)(res, tokens, 'Token renovado');
});
//# sourceMappingURL=auth.controller.js.map