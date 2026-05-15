import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { env } from "../config";
import { prisma } from "../prisma/client";
import { asyncHandler } from "../utils";

export const getHealth = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    let database: "connected" | "disconnected" = "disconnected";

    try {
      await prisma.$queryRaw`SELECT 1`;
      database = "connected";
    } catch {
      database = "disconnected";
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV,
        database,
      },
    });
  },
);
