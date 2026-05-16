"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQueryErrorMessage } from "@/lib/api/errors";
import { cn } from "@/lib/utils";

type QueryErrorStateProps = {
  title?: string;
  error?: unknown;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
};

export function QueryErrorState({
  title = "Something went wrong",
  error,
  message,
  onRetry,
  isRetrying = false,
  className,
}: QueryErrorStateProps) {
  const detail = message ?? (error ? getQueryErrorMessage(error) : undefined);

  return (
    <section
      className={cn(
        "rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center",
        className,
      )}
      role="alert"
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="size-5" aria-hidden />
        </span>
        <p className="text-base font-medium text-foreground">{title}</p>
        {detail ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
        ) : null}
        {onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-1 gap-2"
            onClick={onRetry}
            disabled={isRetrying}
          >
            <RefreshCw
              className={cn("size-3.5", isRetrying && "animate-spin")}
              aria-hidden
            />
            {isRetrying ? "Retrying…" : "Try again"}
          </Button>
        ) : null}
      </div>
    </section>
  );
}
