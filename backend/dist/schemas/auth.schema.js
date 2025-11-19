"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().min(3),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
        role: zod_1.z.nativeEnum(client_1.UserRole).optional(),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().min(1, 'Email o usuario requerido'),
        password: zod_1.z.string().min(1, 'Contraseña requerida'),
    }),
});
exports.refreshSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z.string().min(10),
    }),
});
//# sourceMappingURL=auth.schema.js.map