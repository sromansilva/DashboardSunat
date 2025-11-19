"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declaracionByIdSchema = exports.updateDeclaracionSchema = exports.createDeclaracionSchema = void 0;
const zod_1 = require("zod");
const declaracionesBody = zod_1.z.object({
    tipo: zod_1.z.string().min(2),
    periodo: zod_1.z.string().min(4),
    estado: zod_1.z.string().min(2),
    inconsistenciasJson: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).default({}),
    contribuyenteId: zod_1.z.coerce.number().int().positive(),
});
exports.createDeclaracionSchema = zod_1.z.object({
    body: declaracionesBody,
});
exports.updateDeclaracionSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: declaracionesBody.partial(),
});
exports.declaracionByIdSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
});
//# sourceMappingURL=declaraciones.schema.js.map