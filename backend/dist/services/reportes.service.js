"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReporteById = exports.createReporte = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createReporte = async (input, generadoPorId) => {
    var _a;
    const data = {
        tipo: input.tipo,
        periodoInicio: input.periodoInicio,
        periodoFin: input.periodoFin,
        formato: input.formato,
        metadata: (_a = input.metadata) !== null && _a !== void 0 ? _a : {},
    };
    if (typeof generadoPorId === 'number') {
        data.generadoPorId = generadoPorId;
    }
    const reporte = await prisma_1.default.report.create({ data });
    const exportUrl = simulateExport(reporte.id, input.formato);
    return { reporte, exportUrl };
};
exports.createReporte = createReporte;
const getReporteById = (id) => {
    return prisma_1.default.report.findUnique({
        where: { id },
        include: { generadoPor: true },
    });
};
exports.getReporteById = getReporteById;
const simulateExport = (reporteId, formato) => {
    const filename = `reporte_${reporteId}.${formato}`;
    return `https://storage.fake-neon.app/reports/${filename}`;
};
//# sourceMappingURL=reportes.service.js.map