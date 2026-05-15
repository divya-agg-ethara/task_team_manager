"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_STATUS_TRANSITIONS = exports.TASK_PRIORITIES = exports.TASK_STATUSES = void 0;
exports.TASK_STATUSES = {
    TODO: "TODO",
    IN_PROGRESS: "IN_PROGRESS",
    IN_REVIEW: "IN_REVIEW",
    DONE: "DONE",
    CANCELLED: "CANCELLED",
};
exports.TASK_PRIORITIES = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    URGENT: "URGENT",
};
/** Allowed status transitions for workflow validation */
exports.TASK_STATUS_TRANSITIONS = {
    [exports.TASK_STATUSES.TODO]: [exports.TASK_STATUSES.IN_PROGRESS, exports.TASK_STATUSES.CANCELLED],
    [exports.TASK_STATUSES.IN_PROGRESS]: [
        exports.TASK_STATUSES.TODO,
        exports.TASK_STATUSES.IN_REVIEW,
        exports.TASK_STATUSES.DONE,
        exports.TASK_STATUSES.CANCELLED,
    ],
    [exports.TASK_STATUSES.IN_REVIEW]: [
        exports.TASK_STATUSES.IN_PROGRESS,
        exports.TASK_STATUSES.DONE,
        exports.TASK_STATUSES.CANCELLED,
    ],
    [exports.TASK_STATUSES.DONE]: [exports.TASK_STATUSES.IN_PROGRESS, exports.TASK_STATUSES.TODO],
    [exports.TASK_STATUSES.CANCELLED]: [exports.TASK_STATUSES.TODO],
};
//# sourceMappingURL=task.constants.js.map