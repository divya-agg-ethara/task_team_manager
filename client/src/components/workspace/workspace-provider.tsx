"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useWorkspace } from "@/hooks/use-workspace";
import { useQueryLoadingState } from "@/hooks/use-query-loading";
import type { WorkspaceViewModel } from "@/lib/workspace/types";

type WorkspaceContextValue = {
  data: WorkspaceViewModel | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const query = useWorkspace();
  const isLoading = useQueryLoadingState(query);
  const isError = !isLoading && query.isError;

  return (
    <WorkspaceContext.Provider
      value={{
        data: query.data,
        isLoading,
        isError,
        isFetching: query.isFetching,
        error: query.error,
        refetch: () => {
          void query.refetch();
        },
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspaceContext() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspaceContext must be used within WorkspaceProvider");
  }
  return ctx;
}
