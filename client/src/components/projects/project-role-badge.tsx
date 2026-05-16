import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectRole } from "@/types/project";

export function ProjectRoleBadge({
  role,
  className,
}: {
  role: ProjectRole;
  className?: string;
}) {
  const isAdmin = role === "ADMIN";
  return (
    <Badge
      variant={isAdmin ? "default" : "secondary"}
      className={cn(
        "text-[10px] font-semibold uppercase tracking-wider",
        isAdmin && "shadow-sm shadow-primary/15",
        className,
      )}
    >
      {isAdmin ? "Admin" : "Member"}
    </Badge>
  );
}
