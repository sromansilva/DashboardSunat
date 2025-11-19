import { z } from 'zod';
export declare const createContribuyenteSchema: z.ZodObject<{
    body: z.ZodObject<{
        ruc: z.ZodString;
        nombre: z.ZodString;
        estado: z.ZodString;
        actividadEconomica: z.ZodString;
        historialJson: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateContribuyenteSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        ruc: z.ZodOptional<z.ZodString>;
        nombre: z.ZodOptional<z.ZodString>;
        estado: z.ZodOptional<z.ZodString>;
        actividadEconomica: z.ZodOptional<z.ZodString>;
        historialJson: z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const contribuyenteByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=contribuyentes.schema.d.ts.map