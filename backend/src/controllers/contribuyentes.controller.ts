import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import {
  createContribuyente,
  deleteContribuyente,
  getContribuyenteById,
  getHistorialContribuyente,
  listContribuyentes,
  updateContribuyente,
} from '../services/contribuyentes.service';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/appError';

export const getContribuyentes = asyncHandler(async (_req: Request, res: Response) => {
  const data = await listContribuyentes();
  return sendSuccess(res, data);
});

export const getContribuyente = asyncHandler(async (req: Request, res: Response) => {
  const data = await getContribuyenteById(Number(req.params.id));
  if (!data) {
    throw new AppError('Contribuyente no encontrado', 404);
  }
  return sendSuccess(res, data);
});

export const getHistorial = asyncHandler(async (req: Request, res: Response) => {
  const data = await getHistorialContribuyente(Number(req.params.id));
  if (!data) {
    throw new AppError('Historial no disponible', 404);
  }
  return sendSuccess(res, data);
});

export const createContribuyenteController = asyncHandler(async (req: Request, res: Response) => {
  const data = await createContribuyente(req.body);
  return sendSuccess(res, data, 'Contribuyente creado', 201);
});

export const updateContribuyenteController = asyncHandler(async (req: Request, res: Response) => {
  const data = await updateContribuyente(Number(req.params.id), req.body);
  return sendSuccess(res, data, 'Contribuyente actualizado');
});

export const deleteContribuyenteController = asyncHandler(async (req: Request, res: Response) => {
  await deleteContribuyente(Number(req.params.id));
  return sendSuccess(res, { id: Number(req.params.id) }, 'Contribuyente eliminado');
});

