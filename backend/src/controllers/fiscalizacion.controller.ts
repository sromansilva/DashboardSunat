import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  createFiscalizacion,
  deleteFiscalizacion,
  getFiscalizacionById,
  listFiscalizaciones,
  updateFiscalizacion,
} from '../services/fiscalizacion.service';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/appError';

export const getFiscalizaciones = asyncHandler(async (_req: Request, res: Response) => {
  const data = await listFiscalizaciones();
  return sendSuccess(res, data);
});

export const getFiscalizacion = asyncHandler(async (req: Request, res: Response) => {
  const data = await getFiscalizacionById(Number(req.params.id));
  if (!data) {
    throw new AppError('Fiscalización no encontrada', 404);
  }
  return sendSuccess(res, data);
});

export const createFiscalizacionController = asyncHandler(async (req: Request, res: Response) => {
  const data = await createFiscalizacion(req.body);
  return sendSuccess(res, data, 'Fiscalización creada', 201);
});

export const updateFiscalizacionController = asyncHandler(async (req: Request, res: Response) => {
  const data = await updateFiscalizacion(Number(req.params.id), req.body);
  return sendSuccess(res, data, 'Fiscalización actualizada');
});

export const deleteFiscalizacionController = asyncHandler(async (req: Request, res: Response) => {
  await deleteFiscalizacion(Number(req.params.id));
  return sendSuccess(res, { id: Number(req.params.id) }, 'Fiscalización eliminada');
});

