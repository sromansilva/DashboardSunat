"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode = 400, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map