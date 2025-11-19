import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { verifyAccessToken } from '../utils/token';
import { sendError } from '../utils/response';
import asyncHandler from '../utils/asyncHandler';
import { UserRole } from '@prisma/client';

export const authMiddleware = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Token no provisto', 401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return sendError(res, 'Token no provisto', 401);
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      userId: payload.sub,
      role: payload.role as UserRole,
    };
  } catch (error) {
    return sendError(res, 'Token inválido o expirado', 401);
  }

  return next();
});

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 'No autorizado', 403);
    }

    return next();
  };
};

