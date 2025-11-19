"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message, status = 200) => {
    const payload = {
        success: true,
        data,
        ...(message && { message }),
    };
    return res.status(status).json(payload);
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, status = 500, details) => {
    const payload = {
        success: false,
        message,
        details: details !== null && details !== void 0 ? details : {},
    };
    return res.status(status).json(payload);
};
exports.sendError = sendError;
//# sourceMappingURL=response.js.map