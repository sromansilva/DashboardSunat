import { z } from 'zod';
export declare const createReporteSchema: z.ZodObject<{
    body: z.ZodObject<{
        tipo: z.ZodString;
        periodoInicio: z.ZodCoercedDate<unknown>;
        periodoFin: z.ZodCoercedDate<unknown>;
        formato: z.ZodEnum<{
            pdf: "pdf";
            csv: "csv";
            xlsx: "xlsx";
        }>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const reporteByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=reportes.schema.d.ts.map