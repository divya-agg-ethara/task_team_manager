export declare const WorkspaceRole: {
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
};
export type WorkspaceRole = (typeof WorkspaceRole)[keyof typeof WorkspaceRole];
export declare const TeamMemberRole: {
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
};
export type TeamMemberRole = (typeof TeamMemberRole)[keyof typeof TeamMemberRole];
export declare const ProjectRole: {
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
};
export type ProjectRole = (typeof ProjectRole)[keyof typeof ProjectRole];
export declare const TaskStatus: {
    readonly TODO: "TODO";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly IN_REVIEW: "IN_REVIEW";
    readonly DONE: "DONE";
    readonly CANCELLED: "CANCELLED";
};
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export declare const TaskPriority: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];
//# sourceMappingURL=enums.d.ts.map