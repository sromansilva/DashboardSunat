"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecaudacionController = exports.updateRecaudacionController = exports.createRecaudacionController = exports.getRecaudacion = exports.getAllRecaudacion = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const recaudacion_service_1 = require("../services/recaudacion.service");
const response_1 = require("../utils/response");
const appError_1 = __importDefault(require("../utils/appError"));
exports.getAllRecaudacion = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const filters = {};
    if (req.query.periodo)
        filters.periodo = String(req.query.periodo);
    if (req.query.departamento)
        filters.departamento = String(req.query.departamento);
    if (req.query.tipoContribuyente || req.query.tipo) {
        filters.tipoContribuyente = String((_a = req.query.tipoContribuyente) !== null && _a !== void 0 ? _a : req.query.tipo);
    }
    if (req.query.regimen)
        filters.regimen = String(req.query.regimen);
    const data = await (0, recaudacion_service_1.listRecaudacion)(filters);
    return (0, response_1.sendSuccess)(res, data);
});
exports.getRecaudacion = (0, asyncHandler_1.default)(async (req, res) => {
    const recaudacion = await (0, recaudacion_service_1.getRecaudacionById)(Number(req.params.id));
    if (!recaudacion) {
        throw new appError_1.default('Registro de recaudación no encontrado', 404);
    }
    return (0, response_1.sendSuccess)(res, recaudacion);
});
exports.createRecaudacionController = (0, asyncHandler_1.default)(async (req, res) => {
    const recaudacion = await (0, recaudacion_service_1.createRecaudacion)(req.body);
    return (0, response_1.sendSuccess)(res, recaudacion, 'Registro creado', 201);
});
exports.updateRecaudacionController = (0, asyncHandler_1.default)(async (req, res) => {
    const recaudacion = await (0, recaudacion_service_1.updateRecaudacion)(Number(req.params.id), req.body);
    return (0, response_1.sendSuccess)(res, recaudacion, 'Registro actualizado');
});
exports.deleteRecaudacionController = (0, asyncHandler_1.default)(async (req, res) => {
    await (0, recaudacion_service_1.deleteRecaudacion)(Number(req.params.id));
    return (0, response_1.sendSuccess)(res, { id: Number(req.params.id) }, 'Registro eliminado');
});
//# sourceMappingURL=recaudacion.controller.js.map