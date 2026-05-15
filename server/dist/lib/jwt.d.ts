import type { JwtPayload } from "../types/express";
/**
 * JWT utilities scaffold for auth module implementation.
 */
export declare function signAccessToken(payload: JwtPayload): string;
export declare function verifyAccessToken(token: string): JwtPayload;
//# sourceMappingURL=jwt.d.ts.map