"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiscalizacionController = exports.updateFiscalizacionController = exports.createFiscalizacionController = exports.getFiscalizacion = exports.getFiscalizaciones = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const fiscalizacion_service_1 = require("../services/fiscalizacion.service");
const response_1 = require("../utils/response");
const appError_1 = __importDefault(require("../utils/appError"));
exports.getFiscalizaciones = (0, asyncHandler_1.default)(async (_req, res) => {
    const data = await (0, fiscalizacion_service_1.listFiscalizaciones)();
    return (0, response_1.sendSuccess)(res, data);
});
exports.getFiscalizacion = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, fiscalizacion_service_1.getFiscalizacionById)(Number(req.params.id));
    if (!data) {
        throw new appError_1.default('Fiscalización no encontrada', 404);
    }
    return (0, response_1.sendSuccess)(res, data);
});
exports.createFiscalizacionController = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, fiscalizacion_service_1.createFiscalizacion)(req.body);
    return (0, response_1.sendSuccess)(res, data, 'Fiscalización creada', 201);
});
exports.updateFiscalizacionController = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, fiscalizacion_service_1.updateFiscalizacion)(Number(req.params.id), req.body);
    return (0, response_1.sendSuccess)(res, data, 'Fiscalización actualizada');
});
exports.deleteFiscalizacionController = (0, asyncHandler_1.default)(async (req, res) => {
    await (0, fiscalizacion_service_1.deleteFiscalizacion)(Number(req.params.id));
    return (0, response_1.sendSuccess)(res, { id: Number(req.params.id) }, 'Fiscalización eliminada');
});
//# sourceMappingURL=fiscalizacion.controller.js.map