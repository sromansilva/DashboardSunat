import { Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { prisma } from '../database';
import { sendSuccess } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export const testDbConnection = asyncHandler(async (_req, res: Response) => {
  const result = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() as now`;
  return sendSuccess(res, { timestamp: result[0]?.now ?? null }, 'Conexión a Neon OK');
});

export const protectedPing = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  return sendSuccess(res, { user: req.user }, 'Acceso autorizado');
});

