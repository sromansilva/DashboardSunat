import { Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../types';
import { createReporte, getReporteById } from '../services/reportes.service';
import { sendSuccess } from '../utils/response';
import AppError from '../utils/appError';

export const createReporteController = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { reporte, exportUrl } = await createReporte(
    {
      tipo: req.body.tipo,
      periodoInicio: new Date(req.body.periodoInicio),
      periodoFin: new Date(req.body.periodoFin),
      formato: req.body.formato,
      metadata: req.body.metadata,
    },
    req.user?.userId,
  );

  return sendSuccess(res, { reporte, exportUrl }, 'Reporte generado', 201);
});

export const getReporteController = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = await getReporteById(Number(req.params.id));
  if (!data) {
    throw new AppError('Reporte no encontrado', 404);
  }
  return sendSuccess(res, data);
});

