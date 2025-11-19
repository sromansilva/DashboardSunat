import { z } from 'zod';

const declaracionesBody = z.object({
  tipo: z.string().min(2),
  periodo: z.string().min(4),
  estado: z.string().min(2),
  inconsistenciasJson: z.record(z.string(), z.any()).default({}),
  contribuyenteId: z.coerce.number().int().positive(),
});

export const createDeclaracionSchema = z.object({
  body: declaracionesBody,
});

export const updateDeclaracionSchema = z.object({
  params: z.object({ id: z.string() }),
  body: declaracionesBody.partial(),
});

export const declaracionByIdSchema = z.object({
  params: z.object({ id: z.string() }),
});

