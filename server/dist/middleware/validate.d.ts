import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
type RequestProperty = "body" | "query" | "params";
export declare const validate: <T>(schema: ZodType<T>, property?: RequestProperty) => (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.d.ts.map