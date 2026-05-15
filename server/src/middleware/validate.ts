import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestProperty = "body" | "query" | "params";

export const validate =
  <T>(schema: ZodType<T>, property: RequestProperty = "body") =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      next(result.error);
      return;
    }

    req[property] = result.data as (typeof req)[typeof property];
    next();
  };
