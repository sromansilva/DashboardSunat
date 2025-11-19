process.env.JWT_ACCESS_TOKEN_SECRET = 'test_access_secret_32_chars_long';
process.env.JWT_REFRESH_TOKEN_SECRET = 'test_refresh_secret_32_chars_long';
process.env.ACCESS_TOKEN_EXPIRES_IN = '15m';
process.env.REFRESH_TOKEN_EXPIRES_IN = '7d';
process.env.CORS_ORIGIN = 'http://localhost:5173';
process.env.PORT = '0';
process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'postgresql://user:pass@localhost:5432/db?sslmode=require';
process.env.NODE_ENV = 'test';

