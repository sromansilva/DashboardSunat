"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (handler) => (req, res, next) => {
    handler(req, res, next).catch(next);
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map