import type { NextFunction, Request, Response } from "express";
import type { Role } from "../config";
/**
 * Role-based authorization scaffold.
 * Use after authenticate middleware on protected routes.
 */
export declare const authorize: (...allowedRoles: Role[]) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorize.d.ts.map