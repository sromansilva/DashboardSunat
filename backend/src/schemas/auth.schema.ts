import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.nativeEnum(UserRole).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().min(1, 'Email o usuario requerido'),
    password: z.string().min(1, 'Contraseña requerida'),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(10),
  }),
});

