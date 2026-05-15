import type { NextFunction, Request, Response } from "express";
/**
 * JWT authentication scaffold.
 * Verifies Bearer token and attaches decoded payload to req.user.
 * Implement login/token issuance in auth module later.
 */
export declare function authenticate(req: Request, _res: Response, next: NextFunction): void;
/**
 * Optional authentication — attaches user when token is valid, continues otherwise.
 */
export declare function optionalAuthenticate(req: Request, _res: Response, next: NextFunction): void;
//# sourceMappingURL=authenticate.d.ts.map