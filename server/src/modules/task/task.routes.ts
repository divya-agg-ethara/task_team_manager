import { Router } from "express";
import { PROJECT_ROLES } from "../../config";
import { authorizeProject } from "../../middleware/authorize";
import { validate } from "../../middleware/validate";
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from "./task.controller";
import {
  createTaskSchema,
  listTasksQuerySchema,
  projectIdParamSchema,
  taskParamsSchema,
  updateTaskSchema,
} from "./task.validation";

const taskRouter = Router({ mergeParams: true });

taskRouter.use(
  validate(projectIdParamSchema, "params"),
  authorizeProject(PROJECT_ROLES.ADMIN, PROJECT_ROLES.MEMBER),
);

taskRouter.post("/", validate(createTaskSchema), createTask);
taskRouter.get("/", validate(listTasksQuerySchema, "query"), listTasks);

taskRouter.get(
  "/:taskId",
  validate(taskParamsSchema, "params"),
  getTask,
);

taskRouter.patch(
  "/:taskId",
  validate(taskParamsSchema, "params"),
  validate(updateTaskSchema),
  updateTask,
);

taskRouter.delete(
  "/:taskId",
  validate(taskParamsSchema, "params"),
  deleteTask,
);

export default taskRouter;
