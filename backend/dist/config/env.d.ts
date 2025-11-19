export declare const appConfig: {
    PORT: number;
    CORS_ORIGINS: string[];
    NODE_ENV: "development" | "production" | "test";
    DATABASE_URL: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    CORS_ORIGIN: string;
};
export type AppConfig = typeof appConfig;
export default appConfig;
//# sourceMappingURL=env.d.ts.map