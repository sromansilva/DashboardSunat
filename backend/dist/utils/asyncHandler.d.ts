import { NextFunction, Request, Response } from 'express';
type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
declare const asyncHandler: (handler: AsyncRouteHandler) => (req: Request, res: Response, next: NextFunction) => void;
export default asyncHandler;
//# sourceMappingURL=asyncHandler.d.ts.map