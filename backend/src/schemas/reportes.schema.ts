import { z } from 'zod';

const formats = ['pdf', 'csv', 'xlsx'] as const;

const reportBody = z.object({
  tipo: z.string().min(3),
  periodoInicio: z.coerce.date(),
  periodoFin: z.coerce.date(),
  formato: z.enum(formats),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const createReporteSchema = z.object({
  body: reportBody,
});

export const reporteByIdSchema = z.object({
  params: z.object({ id: z.string() }),
});

