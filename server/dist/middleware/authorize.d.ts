import type { NextFunction, Request, Response } from "express";
import type { ProjectRole } from "../config";
/**
 * Project-level role authorization.
 * Use after authenticate on routes with :projectId param.
 * Implemented for future project/task modules.
 */
export declare const authorizeProject: (...allowedRoles: ProjectRole[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorize.d.ts.map