import { z } from 'zod';
export declare const createRecaudacionSchema: z.ZodObject<{
    body: z.ZodObject<{
        periodo: z.ZodString;
        departamento: z.ZodString;
        tipoContribuyente: z.ZodString;
        regimen: z.ZodString;
        monto: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateRecaudacionSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        periodo: z.ZodOptional<z.ZodString>;
        departamento: z.ZodOptional<z.ZodString>;
        tipoContribuyente: z.ZodOptional<z.ZodString>;
        regimen: z.ZodOptional<z.ZodString>;
        monto: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const recaudacionFiltersSchema: z.ZodObject<{
    query: z.ZodObject<{
        periodo: z.ZodOptional<z.ZodString>;
        departamento: z.ZodOptional<z.ZodString>;
        tipoContribuyente: z.ZodOptional<z.ZodString>;
        regimen: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const recaudacionByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=recaudacion.schema.d.ts.map