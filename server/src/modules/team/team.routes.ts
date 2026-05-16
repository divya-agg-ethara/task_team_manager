import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { requireWorkspaceAdmin } from "../../middleware/requireWorkspaceAdmin";
import { validate } from "../../middleware/validate";
import {
  addTeamMember,
  createTeam,
  deleteTeam,
  getTeam,
  listTeams,
  removeTeamMember,
  updateTeam,
} from "./team.controller";
import {
  addTeamMemberSchema,
  createTeamSchema,
  teamIdParamSchema,
  teamMemberIdParamSchema,
  updateTeamSchema,
} from "./team.validation";

const teamRouter = Router();

teamRouter.use(authenticate);

teamRouter.get("/", listTeams);
teamRouter.post("/", requireWorkspaceAdmin, validate(createTeamSchema), createTeam);

teamRouter.get("/:teamId", validate(teamIdParamSchema, "params"), getTeam);
teamRouter.patch(
  "/:teamId",
  validate(teamIdParamSchema, "params"),
  validate(updateTeamSchema),
  updateTeam,
);
teamRouter.delete("/:teamId", validate(teamIdParamSchema, "params"), deleteTeam);

teamRouter.post(
  "/:teamId/members",
  validate(teamIdParamSchema, "params"),
  validate(addTeamMemberSchema),
  addTeamMember,
);

teamRouter.delete(
  "/:teamId/members/:memberId",
  validate(teamMemberIdParamSchema, "params"),
  removeTeamMember,
);

export default teamRouter;
