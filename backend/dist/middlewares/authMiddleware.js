"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authMiddleware = void 0;
const token_1 = require("../utils/token");
const response_1 = require("../utils/response");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.authMiddleware = (0, asyncHandler_1.default)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return (0, response_1.sendError)(res, 'Token no provisto', 401);
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return (0, response_1.sendError)(res, 'Token no provisto', 401);
    }
    try {
        const payload = (0, token_1.verifyAccessToken)(token);
        req.user = {
            userId: payload.sub,
            role: payload.role,
        };
    }
    catch (error) {
        return (0, response_1.sendError)(res, 'Token inválido o expirado', 401);
    }
    return next();
});
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return (0, response_1.sendError)(res, 'No autorizado', 403);
        }
        return next();
    };
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=authMiddleware.js.map