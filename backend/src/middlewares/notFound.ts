import { Request, Response } from 'express';
import { sendError } from '../utils/response';

const notFound = (req: Request, res: Response) => {
  return sendError(res, `Ruta ${req.originalUrl} no encontrada`, 404);
};

export default notFound;

