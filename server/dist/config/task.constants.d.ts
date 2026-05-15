export declare const TASK_STATUSES: {
    readonly TODO: "TODO";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly IN_REVIEW: "IN_REVIEW";
    readonly DONE: "DONE";
    readonly CANCELLED: "CANCELLED";
};
export type TaskStatus = (typeof TASK_STATUSES)[keyof typeof TASK_STATUSES];
export declare const TASK_PRIORITIES: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type TaskPriority = (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];
/** Allowed status transitions for workflow validation */
export declare const TASK_STATUS_TRANSITIONS: Record<TaskStatus, TaskStatus[]>;
//# sourceMappingURL=task.constants.d.ts.map