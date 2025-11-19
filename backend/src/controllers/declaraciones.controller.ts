import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  createDeclaracion,
  deleteDeclaracion,
  getDeclaracionById,
  listDeclaraciones,
  updateDeclaracion,
} from '../services/declaraciones.service';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/appError';

export const getDeclaraciones = asyncHandler(async (_req: Request, res: Response) => {
  const data = await listDeclaraciones();
  return sendSuccess(res, data);
});

export const getDeclaracion = asyncHandler(async (req: Request, res: Response) => {
  const data = await getDeclaracionById(Number(req.params.id));
  if (!data) {
    throw new AppError('Declaración no encontrada', 404);
  }
  return sendSuccess(res, data);
});

export const createDeclaracionController = asyncHandler(async (req: Request, res: Response) => {
  const data = await createDeclaracion(req.body);
  return sendSuccess(res, data, 'Declaración creada', 201);
});

export const updateDeclaracionController = asyncHandler(async (req: Request, res: Response) => {
  const data = await updateDeclaracion(Number(req.params.id), req.body);
  return sendSuccess(res, data, 'Declaración actualizada');
});

export const deleteDeclaracionController = asyncHandler(async (req: Request, res: Response) => {
  await deleteDeclaracion(Number(req.params.id));
  return sendSuccess(res, { id: Number(req.params.id) }, 'Declaración eliminada');
});

