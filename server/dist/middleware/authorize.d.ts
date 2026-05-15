import type { NextFunction, Request, Response } from "express";
import type { ProjectRole } from "../config";
/**
 * Project-level role authorization.
 * Attaches membership to req.projectMembership when authorized.
 */
export declare const authorizeProject: (...allowedRoles: ProjectRole[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorize.d.ts.map