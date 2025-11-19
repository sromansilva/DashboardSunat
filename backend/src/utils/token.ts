import jwt, { JwtPayload as DefaultJwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import appConfig from '../config/env';

export interface JwtPayload {
  sub: number;
  role: string;
}

const signToken = (payload: JwtPayload, secret: Secret, expiresIn: string) => {
  const options: SignOptions = {};
  const expiresInValue = expiresIn as unknown as StringValue | number;
  options.expiresIn = expiresInValue;
  const tokenPayload: DefaultJwtPayload & { role: string } = {
    sub: payload.sub.toString(),
    role: payload.role,
  };
  return jwt.sign(tokenPayload, secret, options);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  const decoded = jwt.verify(token, secret) as DefaultJwtPayload & { role?: string };

  if (!decoded?.sub || !decoded.role) {
    throw new Error('Token inválido');
  }

  return {
    sub: typeof decoded.sub === 'string' ? Number(decoded.sub) : (decoded.sub as number),
    role: decoded.role,
  };
};

export const signAccessToken = (payload: JwtPayload) => {
  return signToken(payload, appConfig.JWT_ACCESS_TOKEN_SECRET as Secret, appConfig.ACCESS_TOKEN_EXPIRES_IN);
};

export const signRefreshToken = (payload: JwtPayload) => {
  return signToken(payload, appConfig.JWT_REFRESH_TOKEN_SECRET as Secret, appConfig.REFRESH_TOKEN_EXPIRES_IN);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return verifyToken(token, appConfig.JWT_ACCESS_TOKEN_SECRET as Secret);
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return verifyToken(token, appConfig.JWT_REFRESH_TOKEN_SECRET as Secret);
};

