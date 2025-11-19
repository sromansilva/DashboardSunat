"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reporteByIdSchema = exports.createReporteSchema = void 0;
const zod_1 = require("zod");
const formats = ['pdf', 'csv', 'xlsx'];
const reportBody = zod_1.z.object({
    tipo: zod_1.z.string().min(3),
    periodoInicio: zod_1.z.coerce.date(),
    periodoFin: zod_1.z.coerce.date(),
    formato: zod_1.z.enum(formats),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
exports.createReporteSchema = zod_1.z.object({
    body: reportBody,
});
exports.reporteByIdSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
});
//# sourceMappingURL=reportes.schema.js.map