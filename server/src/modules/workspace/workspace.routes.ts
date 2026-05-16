import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireWorkspaceAdmin } from "../../middleware/requireWorkspaceAdmin";
import { validate } from "../../middleware/validate";
import {
  getAdminAnalytics,
  getWorkspaceOverview,
  updateMemberPerformance,
} from "./workspace.controller";
import {
  updatePerformanceSchema,
  userIdParamSchema,
} from "./workspace.validation";

const workspaceRouter = Router();

workspaceRouter.use(authenticate);

workspaceRouter.get("/overview", getWorkspaceOverview);
workspaceRouter.get("/analytics", requireWorkspaceAdmin, getAdminAnalytics);
workspaceRouter.patch(
  "/performance/:userId",
  requireWorkspaceAdmin,
  validate(userIdParamSchema, "params"),
  validate(updatePerformanceSchema),
  updateMemberPerformance,
);

export default workspaceRouter;
