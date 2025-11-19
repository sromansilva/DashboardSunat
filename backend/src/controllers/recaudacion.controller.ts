import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { createRecaudacion, deleteRecaudacion, getRecaudacionById, listRecaudacion, updateRecaudacion, RecaudacionFilters } from '../services/recaudacion.service';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/appError';

export const getAllRecaudacion = asyncHandler(async (req: Request, res: Response) => {
  const filters: RecaudacionFilters = {};

  if (req.query.periodo) filters.periodo = String(req.query.periodo);
  if (req.query.departamento) filters.departamento = String(req.query.departamento);
  if (req.query.tipoContribuyente || req.query.tipo) {
    filters.tipoContribuyente = String(req.query.tipoContribuyente ?? req.query.tipo);
  }
  if (req.query.regimen) filters.regimen = String(req.query.regimen);

  const data = await listRecaudacion(filters);

  return sendSuccess(res, data);
});

export const getRecaudacion = asyncHandler(async (req: Request, res: Response) => {
  const recaudacion = await getRecaudacionById(Number(req.params.id));
  if (!recaudacion) {
    throw new AppError('Registro de recaudación no encontrado', 404);
  }
  return sendSuccess(res, recaudacion);
});

export const createRecaudacionController = asyncHandler(async (req: Request, res: Response) => {
  const recaudacion = await createRecaudacion(req.body);
  return sendSuccess(res, recaudacion, 'Registro creado', 201);
});

export const updateRecaudacionController = asyncHandler(async (req: Request, res: Response) => {
  const recaudacion = await updateRecaudacion(Number(req.params.id), req.body);
  return sendSuccess(res, recaudacion, 'Registro actualizado');
});

export const deleteRecaudacionController = asyncHandler(async (req: Request, res: Response) => {
  await deleteRecaudacion(Number(req.params.id));
  return sendSuccess(res, { id: Number(req.params.id) }, 'Registro eliminado');
});

