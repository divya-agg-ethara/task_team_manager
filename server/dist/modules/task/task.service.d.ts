import { type ProjectRole } from "../../config";
import type { TaskListMeta, TaskView } from "./task.types";
import { type CreateTaskInput, type ListTasksQuery, type UpdateTaskInput } from "./task.validation";
export declare class TaskService {
    private assertCanUpdateTask;
    private assertCanDeleteTask;
    private assertAssigneeIsProjectMember;
    private getTaskOrThrow;
    createTask(projectId: string, userId: string, input: CreateTaskInput): Promise<TaskView>;
    listTasks(projectId: string, query: ListTasksQuery): Promise<{
        tasks: TaskView[];
        meta: TaskListMeta;
    }>;
    getTaskById(projectId: string, taskId: string): Promise<TaskView>;
    updateTask(projectId: string, taskId: string, userId: string, projectRole: ProjectRole, input: UpdateTaskInput): Promise<TaskView>;
    deleteTask(projectId: string, taskId: string, userId: string, projectRole: ProjectRole): Promise<void>;
}
export declare const taskService: TaskService;
//# sourceMappingURL=task.service.d.ts.map