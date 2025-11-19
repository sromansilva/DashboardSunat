import { z } from 'zod';
export declare const createFiscalizacionSchema: z.ZodObject<{
    body: z.ZodObject<{
        sector: z.ZodString;
        riesgo: z.ZodString;
        estado: z.ZodString;
        descripcion: z.ZodString;
        fechaRegistro: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateFiscalizacionSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        sector: z.ZodOptional<z.ZodString>;
        riesgo: z.ZodOptional<z.ZodString>;
        estado: z.ZodOptional<z.ZodString>;
        descripcion: z.ZodOptional<z.ZodString>;
        fechaRegistro: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const fiscalizacionByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=fiscalizacion.schema.d.ts.map