"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../config/prisma"));
const password_1 = require("../utils/password");
const token_1 = require("../utils/token");
const appError_1 = __importDefault(require("../utils/appError"));
const registerUser = async (input) => {
    var _a;
    const existing = await prisma_1.default.user.findFirst({
        where: {
            OR: [{ email: input.email }, { username: input.username }],
        },
    });
    if (existing) {
        throw new appError_1.default('Usuario ya registrado con este correo o usuario', 409);
    }
    const passwordHash = await (0, password_1.hashPassword)(input.password);
    const user = await prisma_1.default.user.create({
        data: {
            username: input.username,
            email: input.email,
            passwordHash,
            role: (_a = input.role) !== null && _a !== void 0 ? _a : client_1.UserRole.analista,
        },
    });
    return sanitizeUser(user);
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user) {
        throw new appError_1.default('Credenciales inválidas', 401);
    }
    const isValid = await (0, password_1.comparePassword)(password, user.passwordHash);
    if (!isValid) {
        throw new appError_1.default('Credenciales inválidas', 401);
    }
    const accessToken = (0, token_1.signAccessToken)({ sub: user.id, role: user.role });
    const refreshToken = (0, token_1.signRefreshToken)({ sub: user.id, role: user.role });
    return {
        user: sanitizeUser(user),
        tokens: { accessToken, refreshToken },
    };
};
exports.loginUser = loginUser;
const refreshTokens = async (userId, role) => {
    const accessToken = (0, token_1.signAccessToken)({ sub: userId, role });
    const refreshToken = (0, token_1.signRefreshToken)({ sub: userId, role });
    return { accessToken, refreshToken };
};
exports.refreshTokens = refreshTokens;
const sanitizeUser = (user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
});
//# sourceMappingURL=auth.service.js.map