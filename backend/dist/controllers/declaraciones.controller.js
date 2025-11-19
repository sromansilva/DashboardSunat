"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeclaracionController = exports.updateDeclaracionController = exports.createDeclaracionController = exports.getDeclaracion = exports.getDeclaraciones = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const declaraciones_service_1 = require("../services/declaraciones.service");
const response_1 = require("../utils/response");
const appError_1 = __importDefault(require("../utils/appError"));
exports.getDeclaraciones = (0, asyncHandler_1.default)(async (_req, res) => {
    const data = await (0, declaraciones_service_1.listDeclaraciones)();
    return (0, response_1.sendSuccess)(res, data);
});
exports.getDeclaracion = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, declaraciones_service_1.getDeclaracionById)(Number(req.params.id));
    if (!data) {
        throw new appError_1.default('Declaración no encontrada', 404);
    }
    return (0, response_1.sendSuccess)(res, data);
});
exports.createDeclaracionController = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, declaraciones_service_1.createDeclaracion)(req.body);
    return (0, response_1.sendSuccess)(res, data, 'Declaración creada', 201);
});
exports.updateDeclaracionController = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, declaraciones_service_1.updateDeclaracion)(Number(req.params.id), req.body);
    return (0, response_1.sendSuccess)(res, data, 'Declaración actualizada');
});
exports.deleteDeclaracionController = (0, asyncHandler_1.default)(async (req, res) => {
    await (0, declaraciones_service_1.deleteDeclaracion)(Number(req.params.id));
    return (0, response_1.sendSuccess)(res, { id: Number(req.params.id) }, 'Declaración eliminada');
});
//# sourceMappingURL=declaraciones.controller.js.map