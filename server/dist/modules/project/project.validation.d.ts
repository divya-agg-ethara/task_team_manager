import { z } from "zod";
export declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateProjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodLiteral<null>]>>;
}, z.core.$strip>;
export declare const projectIdParamSchema: z.ZodObject<{
    projectId: z.ZodString;
}, z.core.$strip>;
export declare const memberIdParamSchema: z.ZodObject<{
    projectId: z.ZodString;
    memberId: z.ZodString;
}, z.core.$strip>;
export declare const addMemberSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        ADMIN: "ADMIN";
        MEMBER: "MEMBER";
    }>>;
}, z.core.$strip>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
//# sourceMappingURL=project.validation.d.ts.map