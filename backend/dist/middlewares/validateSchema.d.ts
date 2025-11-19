import { ZodSchema } from 'zod';
import { NextFunction, Request, Response } from 'express';
export declare const validateSchema: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=validateSchema.d.ts.map