import { z } from 'zod';
export declare const createDeclaracionSchema: z.ZodObject<{
    body: z.ZodObject<{
        tipo: z.ZodString;
        periodo: z.ZodString;
        estado: z.ZodString;
        inconsistenciasJson: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
        contribuyenteId: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateDeclaracionSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        tipo: z.ZodOptional<z.ZodString>;
        periodo: z.ZodOptional<z.ZodString>;
        estado: z.ZodOptional<z.ZodString>;
        inconsistenciasJson: z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>;
        contribuyenteId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const declaracionByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=declaraciones.schema.d.ts.map