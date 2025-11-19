import { ZodError, ZodSchema } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { sendError } from '../utils/response';

export const validateSchema = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      return next();
    } catch (error) {
      const zodError = error as ZodError;
      return sendError(
        res,
        'Validación fallida',
        422,
        zodError.flatten()
      );
    }
  };
};

