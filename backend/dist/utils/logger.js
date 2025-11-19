"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* eslint-disable no-console */
exports.logger = {
    info: (message, meta) => {
        console.log(`[INFO] ${message}`, meta !== null && meta !== void 0 ? meta : '');
    },
    warn: (message, meta) => {
        console.warn(`[WARN] ${message}`, meta !== null && meta !== void 0 ? meta : '');
    },
    error: (message, meta) => {
        console.error(`[ERROR] ${message}`, meta !== null && meta !== void 0 ? meta : '');
    },
};
exports.default = exports.logger;
//# sourceMappingURL=logger.js.map