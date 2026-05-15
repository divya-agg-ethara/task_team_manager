import type { NextFunction, Request, Response } from "express";
/**
 * Loads the authenticated user from the database and attaches to req.currentUser.
 * Must run after authenticate middleware.
 */
export declare const loadCurrentUser: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=loadCurrentUser.d.ts.map