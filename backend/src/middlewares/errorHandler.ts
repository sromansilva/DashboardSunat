import { NextFunction, Request, Response } from 'express';
import { sendError } from '../utils/response';
import logger from '../utils/logger';
import AppError from '../utils/appError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.message, err);

  if (res.headersSent) {
    return res;
  }

  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode, err.details);
  }

  return sendError(res, err.message || 'Error interno del servidor', 500);
};

