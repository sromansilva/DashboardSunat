"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const logger_1 = __importDefault(require("../utils/logger"));
const appError_1 = __importDefault(require("../utils/appError"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    logger_1.default.error(err.message, err);
    if (res.headersSent) {
        return res;
    }
    if (err instanceof appError_1.default) {
        return (0, response_1.sendError)(res, err.message, err.statusCode, err.details);
    }
    return (0, response_1.sendError)(res, err.message || 'Error interno del servidor', 500);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map