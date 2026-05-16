import { fetchProjects, ProjectsApiError } from "@/lib/api/projects";
import { fetchProjectTasks } from "@/lib/api/tasks";
import { parseApiError } from "@/lib/api/errors";
import type { EnrichedTask } from "@/lib/dashboard/types";
import type { ProjectSummary } from "@/types/project";

export async function fetchDashboardRaw(): Promise<{
  projects: ProjectSummary[];
  tasks: EnrichedTask[];
}> {
  let projects: ProjectSummary[];

  try {
    projects = await fetchProjects();
  } catch (error) {
    if (error instanceof ProjectsApiError) throw error;
    throw new ProjectsApiError(
      parseApiError(error, "Could not load projects."),
      0,
    );
  }

  const results = await Promise.all(
    projects.map(async (project) => {
      try {
        const { tasks } = await fetchProjectTasks(project.id);
        return tasks.map(
          (task): EnrichedTask => ({
            ...task,
            projectName: project.name,
          }),
        );
      } catch {
        return [] as EnrichedTask[];
      }
    }),
  );

  return {
    projects,
    tasks: results.flat(),
  };
}
