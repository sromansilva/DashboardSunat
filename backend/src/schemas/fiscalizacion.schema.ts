import { z } from 'zod';

const fiscalizacionBody = z.object({
  sector: z.string().min(2),
  riesgo: z.string().min(2),
  estado: z.string().min(2),
  descripcion: z.string().min(5),
  fechaRegistro: z.coerce.date().optional(),
});

export const createFiscalizacionSchema = z.object({
  body: fiscalizacionBody,
});

export const updateFiscalizacionSchema = z.object({
  params: z.object({ id: z.string() }),
  body: fiscalizacionBody.partial(),
});

export const fiscalizacionByIdSchema = z.object({
  params: z.object({ id: z.string() }),
});

