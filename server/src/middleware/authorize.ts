import type { NextFunction, Request, Response } from "express";
import type { Role } from "../config";
import { ApiError } from "../utils";

/**
 * Role-based authorization scaffold.
 * Use after authenticate middleware on protected routes.
 */
export const authorize =
  (...allowedRoles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(ApiError.unauthorized());
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(ApiError.forbidden("Insufficient permissions"));
      return;
    }

    next();
  };
