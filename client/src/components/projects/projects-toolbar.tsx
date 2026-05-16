"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectRole } from "@/types/project";

export type ProjectFilterRole = "ALL" | ProjectRole;

type ProjectsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: ProjectFilterRole;
  onRoleFilterChange: (value: ProjectFilterRole) => void;
  resultCount: number;
};

export function ProjectsToolbar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  resultCount,
}: ProjectsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects…"
          className="h-10 border-border/60 bg-muted/30 pl-9 shadow-sm ring-1 ring-transparent transition-[border,box-shadow] focus-visible:ring-border/40"
        />
      </div>
      <div className="flex items-center gap-2">
        <Select
          value={roleFilter}
          onValueChange={(v) => onRoleFilterChange(v as ProjectFilterRole)}
        >
          <SelectTrigger className="h-10 w-[140px] border-border/60 bg-muted/30 shadow-sm">
            <SlidersHorizontal className="mr-1.5 size-3.5 text-muted-foreground" />
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
          </SelectContent>
        </Select>
        <p className="hidden text-xs text-muted-foreground sm:block">
          {resultCount} project{resultCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
