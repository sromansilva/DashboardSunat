import { UserRole } from '@prisma/client';
import prisma from '../config/prisma';
import { hashPassword, comparePassword } from '../utils/password';
import { signAccessToken, signRefreshToken } from '../utils/token';
import AppError from '../utils/appError';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}

export const registerUser = async (input: RegisterInput) => {
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: input.email }, { username: input.username }],
    },
  });

  if (existing) {
    throw new AppError('Usuario ya registrado con este correo o usuario', 409);
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      username: input.username,
      email: input.email,
      passwordHash,
      role: input.role ?? UserRole.analista,
    },
  });

  return sanitizeUser(user);
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const isValid = await comparePassword(password, user.passwordHash);

  if (!isValid) {
    throw new AppError('Credenciales inválidas', 401);
  }

  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

  return {
    user: sanitizeUser(user),
    tokens: { accessToken, refreshToken },
  };
};

export const refreshTokens = async (userId: number, role: UserRole) => {
  const accessToken = signAccessToken({ sub: userId, role });
  const refreshToken = signRefreshToken({ sub: userId, role });

  return { accessToken, refreshToken };
};

const sanitizeUser = (user: { id: number; username: string; email: string; role: UserRole; createdAt: Date }) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

