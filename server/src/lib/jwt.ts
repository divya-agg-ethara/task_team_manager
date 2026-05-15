import jwt from "jsonwebtoken";
import { env } from "../config";
import type { JwtPayload } from "../types/express";

/**
 * JWT utilities scaffold for auth module implementation.
 */
export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
