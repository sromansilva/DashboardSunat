"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('4000'),
    DATABASE_URL: zod_1.z.string().url(),
    JWT_ACCESS_TOKEN_SECRET: zod_1.z.string().min(32),
    JWT_REFRESH_TOKEN_SECRET: zod_1.z.string().min(32),
    ACCESS_TOKEN_EXPIRES_IN: zod_1.z.string().default('15m'),
    REFRESH_TOKEN_EXPIRES_IN: zod_1.z.string().default('7d'),
    CORS_ORIGIN: zod_1.z.string().default('http://localhost:5173'),
});
const env = envSchema.parse(process.env);
const parsedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);
exports.appConfig = {
    ...env,
    PORT: Number(env.PORT) || 4000,
    CORS_ORIGINS: parsedOrigins.length ? parsedOrigins : ['http://localhost:5173'],
};
exports.default = exports.appConfig;
//# sourceMappingURL=env.js.map