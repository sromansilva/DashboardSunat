"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContribuyenteController = exports.updateContribuyenteController = exports.createContribuyenteController = exports.getHistorial = exports.getContribuyente = exports.getContribuyentes = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const contribuyentes_service_1 = require("../services/contribuyentes.service");
const response_1 = require("../utils/response");
const appError_1 = __importDefault(require("../utils/appError"));
exports.getContribuyentes = (0, asyncHandler_1.default)(async (_req, res) => {
    const data = await (0, contribuyentes_service_1.listContribuyentes)();
    return (0, response_1.sendSuccess)(res, data);
});
exports.getContribuyente = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, contribuyentes_service_1.getContribuyenteById)(Number(req.params.id));
    if (!data) {
        throw new appError_1.default('Contribuyente no encontrado', 404);
    }
    return (0, response_1.sendSuccess)(res, data);
});
exports.getHistorial = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, contribuyentes_service_1.getHistorialContribuyente)(Number(req.params.id));
    if (!data) {
        throw new appError_1.default('Historial no disponible', 404);
    }
    return (0, response_1.sendSuccess)(res, data);
});
exports.createContribuyenteController = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, contribuyentes_service_1.createContribuyente)(req.body);
    return (0, response_1.sendSuccess)(res, data, 'Contribuyente creado', 201);
});
exports.updateContribuyenteController = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, contribuyentes_service_1.updateContribuyente)(Number(req.params.id), req.body);
    return (0, response_1.sendSuccess)(res, data, 'Contribuyente actualizado');
});
exports.deleteContribuyenteController = (0, asyncHandler_1.default)(async (req, res) => {
    await (0, contribuyentes_service_1.deleteContribuyente)(Number(req.params.id));
    return (0, response_1.sendSuccess)(res, { id: Number(req.params.id) }, 'Contribuyente eliminado');
});
//# sourceMappingURL=contribuyentes.controller.js.map