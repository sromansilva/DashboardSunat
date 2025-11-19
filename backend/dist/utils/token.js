"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const signToken = (payload, secret, expiresIn) => {
    const options = {};
    const expiresInValue = expiresIn;
    options.expiresIn = expiresInValue;
    const tokenPayload = {
        sub: payload.sub.toString(),
        role: payload.role,
    };
    return jsonwebtoken_1.default.sign(tokenPayload, secret, options);
};
const verifyToken = (token, secret) => {
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    if (!(decoded === null || decoded === void 0 ? void 0 : decoded.sub) || !decoded.role) {
        throw new Error('Token inválido');
    }
    return {
        sub: typeof decoded.sub === 'string' ? Number(decoded.sub) : decoded.sub,
        role: decoded.role,
    };
};
const signAccessToken = (payload) => {
    return signToken(payload, env_1.default.JWT_ACCESS_TOKEN_SECRET, env_1.default.ACCESS_TOKEN_EXPIRES_IN);
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (payload) => {
    return signToken(payload, env_1.default.JWT_REFRESH_TOKEN_SECRET, env_1.default.REFRESH_TOKEN_EXPIRES_IN);
};
exports.signRefreshToken = signRefreshToken;
const verifyAccessToken = (token) => {
    return verifyToken(token, env_1.default.JWT_ACCESS_TOKEN_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return verifyToken(token, env_1.default.JWT_REFRESH_TOKEN_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=token.js.map