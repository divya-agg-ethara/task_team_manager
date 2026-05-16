"use client";

import type { UseQueryResult } from "@tanstack/react-query";
import { useAuthReady } from "@/hooks/use-auth-ready";

/**
 * Loading when auth is not ready yet, or the query is actively fetching without cached data.
 */
export function useQueryLoadingState<TData>(
  query: Pick<
    UseQueryResult<TData, Error>,
    "isPending" | "isFetching" | "data" | "isError"
  >,
  options?: { enabled?: boolean },
): boolean {
  const authReady = useAuthReady();
  const enabled = options?.enabled ?? true;

  if (!enabled) return false;
  if (!authReady) return true;

  return query.isPending || (query.isFetching && query.data === undefined);
}
