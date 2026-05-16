import { toNestErrors } from "@hookform/resolvers";
import type {
  FieldError,
  FieldErrors,
  FieldValues,
  Resolver,
  ResolverOptions,
} from "react-hook-form";
import type { z } from "zod";

type ZodIssue = z.core.$ZodIssue;

type SafeParseSchema<TFieldValues extends FieldValues> = {
  safeParse: (
    data: unknown,
  ) =>
    | { success: true; data: TFieldValues }
    | { success: false; error: z.ZodError };
};

function flattenZodIssues(issues: ZodIssue[]): Record<string, FieldError> {
  const fieldErrors: Record<string, FieldError> = {};

  for (const issue of issues) {
    const path = issue.path.map(String).join(".");
    if (!path || fieldErrors[path]) continue;

    fieldErrors[path] = {
      type: issue.code,
      message: issue.message,
    };
  }

  return fieldErrors;
}

/**
 * Zod 4–native resolver: maps `error.issues` to React Hook Form field errors.
 * Avoids generic "Invalid input" when values are undefined or resolver/schema versions diverge.
 */
export function zodFormResolver<TFieldValues extends FieldValues>(
  schema: SafeParseSchema<TFieldValues>,
): Resolver<TFieldValues> {
  return async (values, _context, options) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const flat = flattenZodIssues(result.error.issues);
    const errors = toNestErrors(
      flat,
      options as ResolverOptions<TFieldValues>,
    ) as FieldErrors<TFieldValues>;

    return {
      values: {} as Record<string, never>,
      errors,
    };
  };
}
