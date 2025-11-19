"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contribuyenteByIdSchema = exports.updateContribuyenteSchema = exports.createContribuyenteSchema = void 0;
const zod_1 = require("zod");
const contribuyenteBody = zod_1.z.object({
    ruc: zod_1.z.string().min(11).max(11),
    nombre: zod_1.z.string().min(3),
    estado: zod_1.z.string().min(3),
    actividadEconomica: zod_1.z.string().min(3),
    historialJson: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).default({}),
});
exports.createContribuyenteSchema = zod_1.z.object({
    body: contribuyenteBody,
});
exports.updateContribuyenteSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    body: contribuyenteBody.partial(),
});
exports.contribuyenteByIdSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
});
//# sourceMappingURL=contribuyentes.schema.js.map