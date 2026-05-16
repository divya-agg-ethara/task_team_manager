import { Router } from "express";
import { API_PREFIX } from "../config";
import { authRouter } from "../modules/auth";
import { projectRouter } from "../modules/project";
import { teamRouter } from "../modules/team";
import { workspaceRouter } from "../modules/workspace";
import healthRouter from "./health.routes";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/teams", teamRouter);
apiRouter.use("/workspace", workspaceRouter);
apiRouter.use("/projects", projectRouter);

export { apiRouter, API_PREFIX };
