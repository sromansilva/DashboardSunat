"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recaudacionByIdSchema = exports.recaudacionFiltersSchema = exports.updateRecaudacionSchema = exports.createRecaudacionSchema = void 0;
const zod_1 = require("zod");
exports.createRecaudacionSchema = zod_1.z.object({
    body: zod_1.z.object({
        periodo: zod_1.z.string().min(4),
        departamento: zod_1.z.string().min(2),
        tipoContribuyente: zod_1.z.string().min(2),
        regimen: zod_1.z.string().min(2),
        monto: zod_1.z.coerce.number().nonnegative(),
    }),
});
exports.updateRecaudacionSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    body: zod_1.z.object({
        periodo: zod_1.z.string().min(4).optional(),
        departamento: zod_1.z.string().min(2).optional(),
        tipoContribuyente: zod_1.z.string().min(2).optional(),
        regimen: zod_1.z.string().min(2).optional(),
        monto: zod_1.z.coerce.number().nonnegative().optional(),
    }),
});
exports.recaudacionFiltersSchema = zod_1.z.object({
    query: zod_1.z.object({
        periodo: zod_1.z.string().optional(),
        departamento: zod_1.z.string().optional(),
        tipoContribuyente: zod_1.z.string().optional(),
        regimen: zod_1.z.string().optional(),
    }),
});
exports.recaudacionByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
//# sourceMappingURL=recaudacion.schema.js.map