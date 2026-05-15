import { Router } from "express";
import { API_PREFIX } from "../config";
import { authRouter } from "../modules/auth";
import healthRouter from "./health.routes";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);

export { apiRouter, API_PREFIX };
