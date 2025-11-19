"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReporteController = exports.createReporteController = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const reportes_service_1 = require("../services/reportes.service");
const response_1 = require("../utils/response");
const appError_1 = __importDefault(require("../utils/appError"));
exports.createReporteController = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const { reporte, exportUrl } = await (0, reportes_service_1.createReporte)({
        tipo: req.body.tipo,
        periodoInicio: new Date(req.body.periodoInicio),
        periodoFin: new Date(req.body.periodoFin),
        formato: req.body.formato,
        metadata: req.body.metadata,
    }, (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId);
    return (0, response_1.sendSuccess)(res, { reporte, exportUrl }, 'Reporte generado', 201);
});
exports.getReporteController = (0, asyncHandler_1.default)(async (req, res) => {
    const data = await (0, reportes_service_1.getReporteById)(Number(req.params.id));
    if (!data) {
        throw new appError_1.default('Reporte no encontrado', 404);
    }
    return (0, response_1.sendSuccess)(res, data);
});
//# sourceMappingURL=reportes.controller.js.map