import { z } from 'zod';

const contribuyenteBody = z.object({
  ruc: z.string().min(11).max(11),
  nombre: z.string().min(3),
  estado: z.string().min(3),
  actividadEconomica: z.string().min(3),
  historialJson: z.record(z.string(), z.any()).default({}),
});

export const createContribuyenteSchema = z.object({
  body: contribuyenteBody,
});

export const updateContribuyenteSchema = z.object({
  params: z.object({ id: z.string() }),
  body: contribuyenteBody.partial(),
});

export const contribuyenteByIdSchema = z.object({
  params: z.object({ id: z.string() }),
});

