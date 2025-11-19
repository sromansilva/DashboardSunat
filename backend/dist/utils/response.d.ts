import { Response } from 'express';
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, status?: number) => Response<any, Record<string, any>>;
export declare const sendError: (res: Response, message: string, status?: number, details?: unknown) => Response<any, Record<string, any>>;
//# sourceMappingURL=response.d.ts.map