export const workspaceKeys = {
  all: ["workspace"] as const,
  data: () => [...workspaceKeys.all, "data"] as const,
};
