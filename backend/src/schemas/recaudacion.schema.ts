import { z } from 'zod';

export const createRecaudacionSchema = z.object({
  body: z.object({
    periodo: z.string().min(4),
    departamento: z.string().min(2),
    tipoContribuyente: z.string().min(2),
    regimen: z.string().min(2),
    monto: z.coerce.number().nonnegative(),
  }),
});

export const updateRecaudacionSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    periodo: z.string().min(4).optional(),
    departamento: z.string().min(2).optional(),
    tipoContribuyente: z.string().min(2).optional(),
    regimen: z.string().min(2).optional(),
    monto: z.coerce.number().nonnegative().optional(),
  }),
});

export const recaudacionFiltersSchema = z.object({
  query: z.object({
    periodo: z.string().optional(),
    departamento: z.string().optional(),
    tipoContribuyente: z.string().optional(),
    regimen: z.string().optional(),
  }),
});

export const recaudacionByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

