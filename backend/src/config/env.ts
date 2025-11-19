import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000'),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_TOKEN_SECRET: z.string().min(32),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const env = envSchema.parse(process.env);

const parsedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);

export const appConfig = {
  ...env,
  PORT: Number(env.PORT) || 4000,
  CORS_ORIGINS: parsedOrigins.length ? parsedOrigins : ['http://localhost:5173'],
};

export type AppConfig = typeof appConfig;

export default appConfig;

