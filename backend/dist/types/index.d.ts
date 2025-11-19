import { Request } from 'express';
import { UserRole } from '@prisma/client';
export interface AuthenticatedUser {
    userId: number;
    role: UserRole;
}
export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}
//# sourceMappingURL=index.d.ts.map