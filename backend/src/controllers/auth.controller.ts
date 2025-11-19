import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { loginUser, refreshTokens, registerUser } from '../services/auth.service';
import { sendSuccess } from '../utils/response';
import { verifyRefreshToken } from '../utils/token';
import logger from '../utils/logger';
import { UserRole } from '@prisma/client';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  logger.info(`Nuevo usuario registrado: ${user.email}`);
  return sendSuccess(res, user, 'Usuario registrado', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  // Acepta 'email' pero puede ser email o username
  const emailOrUsername = req.body.email || req.body.username;
  const { user, tokens } = await loginUser(emailOrUsername, req.body.password);
  logger.info(`Usuario ${user.email} inició sesión`);
  return sendSuccess(res, { user, tokens }, 'Login exitoso');
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const payload = verifyRefreshToken(refreshToken);
  const tokens = await refreshTokens(payload.sub, payload.role as UserRole);
  return sendSuccess(res, tokens, 'Token renovado');
});

