"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fiscalizacionByIdSchema = exports.updateFiscalizacionSchema = exports.createFiscalizacionSchema = void 0;
const zod_1 = require("zod");
const fiscalizacionBody = zod_1.z.object({
    sector: zod_1.z.string().min(2),
    riesgo: zod_1.z.string().min(2),
    estado: zod_1.z.string().min(2),
    descripcion: zod_1.z.string().min(5),
    fechaRegistro: zod_1.z.coerce.date().optional(),
});
exports.createFiscalizacionSchema = zod_1.z.object({
    body: fiscalizacionBody,
});
exports.updateFiscalizacionSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: fiscalizacionBody.partial(),
});
exports.fiscalizacionByIdSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
});
//# sourceMappingURL=fiscalizacion.schema.js.map