import { Response } from 'express';

type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

type ErrorResponse = {
  success: false;
  message: string;
  details?: unknown;
};

export const sendSuccess = <T>(res: Response, data: T, message?: string, status = 200) => {
  const payload: SuccessResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  };

  return res.status(status).json(payload);
};

export const sendError = (res: Response, message: string, status = 500, details?: unknown) => {
  const payload: ErrorResponse = {
    success: false,
    message,
    details: details ?? {},
  };

  return res.status(status).json(payload);
};

