import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/jwt";
import { ApiError } from "../utils";

/**
 * Verifies JWT Bearer token and attaches decoded payload to req.user.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(ApiError.unauthorized("Missing or invalid authorization header"));
    return;
  }

  const token = authHeader.slice(7);

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(ApiError.unauthorized("Invalid or expired token"));
  }
}

/**
 * Optional authentication — attaches user when token is valid, continues otherwise.
 */
export function optionalAuthenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = authHeader.slice(7);

  try {
    req.user = verifyAccessToken(token);
  } catch {
    // Invalid token on optional routes — proceed without user
  }

  next();
}
