import type { ProjectDetail, ProjectMemberView, ProjectSummary } from "./project.types";
import type { AddMemberInput, CreateProjectInput, UpdateProjectInput } from "./project.validation";
export declare class ProjectService {
    createProject(userId: string, input: CreateProjectInput): Promise<ProjectDetail>;
    listUserProjects(userId: string): Promise<ProjectSummary[]>;
    getProjectById(userId: string, projectId: string): Promise<ProjectDetail>;
    updateProject(userId: string, projectId: string, input: UpdateProjectInput): Promise<ProjectDetail>;
    deleteProject(projectId: string): Promise<void>;
    addMember(projectId: string, input: AddMemberInput): Promise<ProjectMemberView>;
    listMembers(projectId: string): Promise<ProjectMemberView[]>;
    removeMember(projectId: string, memberId: string, requesterId: string): Promise<void>;
}
export declare const projectService: ProjectService;
//# sourceMappingURL=project.service.d.ts.map