export default class AppError extends Error {
    statusCode: number;
    details?: unknown;
    constructor(message: string, statusCode?: number, details?: unknown);
}
//# sourceMappingURL=appError.d.ts.map