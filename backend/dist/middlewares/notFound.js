"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const notFound = (req, res) => {
    return (0, response_1.sendError)(res, `Ruta ${req.originalUrl} no encontrada`, 404);
};
exports.default = notFound;
//# sourceMappingURL=notFound.js.map