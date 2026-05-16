export declare const API_PREFIX = "/api/v1";
export declare const PROJECT_ROLES: {
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
};
export type ProjectRole = (typeof PROJECT_ROLES)[keyof typeof PROJECT_ROLES];
export declare const WORKSPACE_ROLES: {
    readonly ADMIN: "ADMIN";
    readonly MEMBER: "MEMBER";
};
export type WorkspaceRole = (typeof WORKSPACE_ROLES)[keyof typeof WORKSPACE_ROLES];
export declare const BCRYPT_SALT_ROUNDS = 12;
//# sourceMappingURL=constants.d.ts.map