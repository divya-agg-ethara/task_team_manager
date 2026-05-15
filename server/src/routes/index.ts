import { Router } from "express";
import { API_PREFIX } from "../config";
import healthRouter from "./health.routes";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);

export { apiRouter, API_PREFIX };
