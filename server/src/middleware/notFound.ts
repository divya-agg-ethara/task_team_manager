import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils";

export function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}
