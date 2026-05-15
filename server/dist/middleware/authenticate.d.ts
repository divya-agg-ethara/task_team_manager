import type { NextFunction, Request, Response } from "express";
/**
 * Verifies JWT Bearer token and attaches decoded payload to req.user.
 */
export declare function authenticate(req: Request, _res: Response, next: NextFunction): void;
/**
 * Optional authentication — attaches user when token is valid, continues otherwise.
 */
export declare function optionalAuthenticate(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=authenticate.d.ts.map