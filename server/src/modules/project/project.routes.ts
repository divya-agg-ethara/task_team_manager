import { Router } from "express";
import { PROJECT_ROLES } from "../../config";
import { authenticate } from "../../middleware/authenticate";
import { authorizeProject } from "../../middleware/authorize";
import { validate } from "../../middleware/validate";
import {
  addMember,
  createProject,
  deleteProject,
  getProject,
  listMembers,
  listProjects,
  removeMember,
  updateProject,
} from "./project.controller";
import { taskRouter } from "../task";
import {
  addMemberSchema,
  createProjectSchema,
  memberIdParamSchema,
  projectIdParamSchema,
  updateProjectSchema,
} from "./project.validation";

const projectRouter = Router();

projectRouter.use(authenticate);

projectRouter.post("/", validate(createProjectSchema), createProject);
projectRouter.get("/", listProjects);

projectRouter.get(
  "/:projectId",
  validate(projectIdParamSchema, "params"),
  authorizeProject(PROJECT_ROLES.ADMIN, PROJECT_ROLES.MEMBER),
  getProject,
);

projectRouter.patch(
  "/:projectId",
  validate(projectIdParamSchema, "params"),
  authorizeProject(PROJECT_ROLES.ADMIN),
  validate(updateProjectSchema),
  updateProject,
);

projectRouter.delete(
  "/:projectId",
  validate(projectIdParamSchema, "params"),
  authorizeProject(PROJECT_ROLES.ADMIN),
  deleteProject,
);

projectRouter.post(
  "/:projectId/members",
  validate(projectIdParamSchema, "params"),
  authorizeProject(PROJECT_ROLES.ADMIN),
  validate(addMemberSchema),
  addMember,
);

projectRouter.get(
  "/:projectId/members",
  validate(projectIdParamSchema, "params"),
  authorizeProject(PROJECT_ROLES.ADMIN, PROJECT_ROLES.MEMBER),
  listMembers,
);

projectRouter.delete(
  "/:projectId/members/:memberId",
  validate(memberIdParamSchema, "params"),
  authorizeProject(PROJECT_ROLES.ADMIN),
  removeMember,
);

projectRouter.use("/:projectId/tasks", taskRouter);

export default projectRouter;
