import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../types';
import { UserRole } from '@prisma/client';
export declare const authMiddleware: (req: import("express").Request, res: Response, next: NextFunction) => void;
export declare const authorizeRoles: (...roles: UserRole[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=authMiddleware.d.ts.map