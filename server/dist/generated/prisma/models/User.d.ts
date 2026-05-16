import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    role: $Enums.WorkspaceRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    role: $Enums.WorkspaceRole | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    name: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    password: string;
    name: string;
    role: $Enums.WorkspaceRole;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumWorkspaceRoleFilter<"User"> | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    projectMembers?: Prisma.ProjectMemberListRelationFilter;
    teamMembers?: Prisma.TeamMemberListRelationFilter;
    createdProjects?: Prisma.ProjectListRelationFilter;
    createdTeams?: Prisma.TeamListRelationFilter;
    createdTasks?: Prisma.TaskListRelationFilter;
    assignedTasks?: Prisma.TaskListRelationFilter;
    performance?: Prisma.XOR<Prisma.MemberPerformanceNullableScalarRelationFilter, Prisma.MemberPerformanceWhereInput> | null;
    performanceUpdates?: Prisma.MemberPerformanceListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    projectMembers?: Prisma.ProjectMemberOrderByRelationAggregateInput;
    teamMembers?: Prisma.TeamMemberOrderByRelationAggregateInput;
    createdProjects?: Prisma.ProjectOrderByRelationAggregateInput;
    createdTeams?: Prisma.TeamOrderByRelationAggregateInput;
    createdTasks?: Prisma.TaskOrderByRelationAggregateInput;
    assignedTasks?: Prisma.TaskOrderByRelationAggregateInput;
    performance?: Prisma.MemberPerformanceOrderByWithRelationInput;
    performanceUpdates?: Prisma.MemberPerformanceOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumWorkspaceRoleFilter<"User"> | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    projectMembers?: Prisma.ProjectMemberListRelationFilter;
    teamMembers?: Prisma.TeamMemberListRelationFilter;
    createdProjects?: Prisma.ProjectListRelationFilter;
    createdTeams?: Prisma.TeamListRelationFilter;
    createdTasks?: Prisma.TaskListRelationFilter;
    assignedTasks?: Prisma.TaskListRelationFilter;
    performance?: Prisma.XOR<Prisma.MemberPerformanceNullableScalarRelationFilter, Prisma.MemberPerformanceWhereInput> | null;
    performanceUpdates?: Prisma.MemberPerformanceListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumWorkspaceRoleWithAggregatesFilter<"User"> | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumWorkspaceRoleFieldUpdateOperationsInput = {
    set?: $Enums.WorkspaceRole;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutCreatedTeamsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedTeamsInput, Prisma.UserUncheckedCreateWithoutCreatedTeamsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedTeamsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCreatedTeamsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedTeamsInput, Prisma.UserUncheckedCreateWithoutCreatedTeamsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedTeamsInput;
    upsert?: Prisma.UserUpsertWithoutCreatedTeamsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCreatedTeamsInput, Prisma.UserUpdateWithoutCreatedTeamsInput>, Prisma.UserUncheckedUpdateWithoutCreatedTeamsInput>;
};
export type UserCreateNestedOneWithoutTeamMembersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTeamMembersInput, Prisma.UserUncheckedCreateWithoutTeamMembersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTeamMembersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutTeamMembersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTeamMembersInput, Prisma.UserUncheckedCreateWithoutTeamMembersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTeamMembersInput;
    upsert?: Prisma.UserUpsertWithoutTeamMembersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutTeamMembersInput, Prisma.UserUpdateWithoutTeamMembersInput>, Prisma.UserUncheckedUpdateWithoutTeamMembersInput>;
};
export type UserCreateNestedOneWithoutPerformanceInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPerformanceInput, Prisma.UserUncheckedCreateWithoutPerformanceInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPerformanceInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutPerformanceUpdatesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPerformanceUpdatesInput, Prisma.UserUncheckedCreateWithoutPerformanceUpdatesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPerformanceUpdatesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPerformanceNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPerformanceInput, Prisma.UserUncheckedCreateWithoutPerformanceInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPerformanceInput;
    upsert?: Prisma.UserUpsertWithoutPerformanceInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPerformanceInput, Prisma.UserUpdateWithoutPerformanceInput>, Prisma.UserUncheckedUpdateWithoutPerformanceInput>;
};
export type UserUpdateOneRequiredWithoutPerformanceUpdatesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPerformanceUpdatesInput, Prisma.UserUncheckedCreateWithoutPerformanceUpdatesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPerformanceUpdatesInput;
    upsert?: Prisma.UserUpsertWithoutPerformanceUpdatesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPerformanceUpdatesInput, Prisma.UserUpdateWithoutPerformanceUpdatesInput>, Prisma.UserUncheckedUpdateWithoutPerformanceUpdatesInput>;
};
export type UserCreateNestedOneWithoutCreatedProjectsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedProjectsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCreatedProjectsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedProjectsInput;
    upsert?: Prisma.UserUpsertWithoutCreatedProjectsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCreatedProjectsInput, Prisma.UserUpdateWithoutCreatedProjectsInput>, Prisma.UserUncheckedUpdateWithoutCreatedProjectsInput>;
};
export type UserCreateNestedOneWithoutProjectMembersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProjectMembersInput, Prisma.UserUncheckedCreateWithoutProjectMembersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProjectMembersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutProjectMembersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProjectMembersInput, Prisma.UserUncheckedCreateWithoutProjectMembersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProjectMembersInput;
    upsert?: Prisma.UserUpsertWithoutProjectMembersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProjectMembersInput, Prisma.UserUpdateWithoutProjectMembersInput>, Prisma.UserUncheckedUpdateWithoutProjectMembersInput>;
};
export type UserCreateNestedOneWithoutCreatedTasksInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedTasksInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutAssignedTasksInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAssignedTasksInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCreatedTasksNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCreatedTasksInput;
    upsert?: Prisma.UserUpsertWithoutCreatedTasksInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCreatedTasksInput, Prisma.UserUpdateWithoutCreatedTasksInput>, Prisma.UserUncheckedUpdateWithoutCreatedTasksInput>;
};
export type UserUpdateOneWithoutAssignedTasksNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAssignedTasksInput;
    upsert?: Prisma.UserUpsertWithoutAssignedTasksInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAssignedTasksInput, Prisma.UserUpdateWithoutAssignedTasksInput>, Prisma.UserUncheckedUpdateWithoutAssignedTasksInput>;
};
export type UserCreateWithoutCreatedTeamsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateWithoutCreatedTeamsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserCreateOrConnectWithoutCreatedTeamsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedTeamsInput, Prisma.UserUncheckedCreateWithoutCreatedTeamsInput>;
};
export type UserUpsertWithoutCreatedTeamsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCreatedTeamsInput, Prisma.UserUncheckedUpdateWithoutCreatedTeamsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedTeamsInput, Prisma.UserUncheckedCreateWithoutCreatedTeamsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCreatedTeamsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCreatedTeamsInput, Prisma.UserUncheckedUpdateWithoutCreatedTeamsInput>;
};
export type UserUpdateWithoutCreatedTeamsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateWithoutCreatedTeamsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
export type UserCreateWithoutTeamMembersInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateWithoutTeamMembersInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserCreateOrConnectWithoutTeamMembersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutTeamMembersInput, Prisma.UserUncheckedCreateWithoutTeamMembersInput>;
};
export type UserUpsertWithoutTeamMembersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutTeamMembersInput, Prisma.UserUncheckedUpdateWithoutTeamMembersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutTeamMembersInput, Prisma.UserUncheckedCreateWithoutTeamMembersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutTeamMembersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutTeamMembersInput, Prisma.UserUncheckedUpdateWithoutTeamMembersInput>;
};
export type UserUpdateWithoutTeamMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateWithoutTeamMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
export type UserCreateWithoutPerformanceInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateWithoutPerformanceInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserCreateOrConnectWithoutPerformanceInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPerformanceInput, Prisma.UserUncheckedCreateWithoutPerformanceInput>;
};
export type UserCreateWithoutPerformanceUpdatesInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutPerformanceUpdatesInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutPerformanceUpdatesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPerformanceUpdatesInput, Prisma.UserUncheckedCreateWithoutPerformanceUpdatesInput>;
};
export type UserUpsertWithoutPerformanceInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPerformanceInput, Prisma.UserUncheckedUpdateWithoutPerformanceInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPerformanceInput, Prisma.UserUncheckedCreateWithoutPerformanceInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPerformanceInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPerformanceInput, Prisma.UserUncheckedUpdateWithoutPerformanceInput>;
};
export type UserUpdateWithoutPerformanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateWithoutPerformanceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
export type UserUpsertWithoutPerformanceUpdatesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPerformanceUpdatesInput, Prisma.UserUncheckedUpdateWithoutPerformanceUpdatesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPerformanceUpdatesInput, Prisma.UserUncheckedCreateWithoutPerformanceUpdatesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPerformanceUpdatesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPerformanceUpdatesInput, Prisma.UserUncheckedUpdateWithoutPerformanceUpdatesInput>;
};
export type UserUpdateWithoutPerformanceUpdatesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutPerformanceUpdatesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
};
export type UserCreateWithoutCreatedProjectsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateWithoutCreatedProjectsInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserCreateOrConnectWithoutCreatedProjectsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
};
export type UserUpsertWithoutCreatedProjectsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCreatedProjectsInput, Prisma.UserUncheckedUpdateWithoutCreatedProjectsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedProjectsInput, Prisma.UserUncheckedCreateWithoutCreatedProjectsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCreatedProjectsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCreatedProjectsInput, Prisma.UserUncheckedUpdateWithoutCreatedProjectsInput>;
};
export type UserUpdateWithoutCreatedProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateWithoutCreatedProjectsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
export type UserCreateWithoutProjectMembersInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateWithoutProjectMembersInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserCreateOrConnectWithoutProjectMembersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProjectMembersInput, Prisma.UserUncheckedCreateWithoutProjectMembersInput>;
};
export type UserUpsertWithoutProjectMembersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProjectMembersInput, Prisma.UserUncheckedUpdateWithoutProjectMembersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProjectMembersInput, Prisma.UserUncheckedCreateWithoutProjectMembersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProjectMembersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProjectMembersInput, Prisma.UserUncheckedUpdateWithoutProjectMembersInput>;
};
export type UserUpdateWithoutProjectMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateWithoutProjectMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
export type UserCreateWithoutCreatedTasksInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateWithoutCreatedTasksInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    assignedTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutAssignedToInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserCreateOrConnectWithoutCreatedTasksInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
};
export type UserCreateWithoutAssignedTasksInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskCreateNestedManyWithoutCreatedByInput;
    performance?: Prisma.MemberPerformanceCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceCreateNestedManyWithoutUpdaterInput;
};
export type UserUncheckedCreateWithoutAssignedTasksInput = {
    id?: string;
    email: string;
    password: string;
    name: string;
    role?: $Enums.WorkspaceRole;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedCreateNestedManyWithoutUserInput;
    teamMembers?: Prisma.TeamMemberUncheckedCreateNestedManyWithoutUserInput;
    createdProjects?: Prisma.ProjectUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTeams?: Prisma.TeamUncheckedCreateNestedManyWithoutCreatedByInput;
    createdTasks?: Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput;
    performance?: Prisma.MemberPerformanceUncheckedCreateNestedOneWithoutUserInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedCreateNestedManyWithoutUpdaterInput;
};
export type UserCreateOrConnectWithoutAssignedTasksInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
};
export type UserUpsertWithoutCreatedTasksInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCreatedTasksInput, Prisma.UserUncheckedUpdateWithoutCreatedTasksInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCreatedTasksInput, Prisma.UserUncheckedCreateWithoutCreatedTasksInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCreatedTasksInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCreatedTasksInput, Prisma.UserUncheckedUpdateWithoutCreatedTasksInput>;
};
export type UserUpdateWithoutCreatedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateWithoutCreatedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    assignedTasks?: Prisma.TaskUncheckedUpdateManyWithoutAssignedToNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
export type UserUpsertWithoutAssignedTasksInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAssignedTasksInput, Prisma.UserUncheckedUpdateWithoutAssignedTasksInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAssignedTasksInput, Prisma.UserUncheckedCreateWithoutAssignedTasksInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAssignedTasksInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAssignedTasksInput, Prisma.UserUncheckedUpdateWithoutAssignedTasksInput>;
};
export type UserUpdateWithoutAssignedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUpdateManyWithoutCreatedByNestedInput;
    performance?: Prisma.MemberPerformanceUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUpdateManyWithoutUpdaterNestedInput;
};
export type UserUncheckedUpdateWithoutAssignedTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumWorkspaceRoleFieldUpdateOperationsInput | $Enums.WorkspaceRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectMembers?: Prisma.ProjectMemberUncheckedUpdateManyWithoutUserNestedInput;
    teamMembers?: Prisma.TeamMemberUncheckedUpdateManyWithoutUserNestedInput;
    createdProjects?: Prisma.ProjectUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTeams?: Prisma.TeamUncheckedUpdateManyWithoutCreatedByNestedInput;
    createdTasks?: Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput;
    performance?: Prisma.MemberPerformanceUncheckedUpdateOneWithoutUserNestedInput;
    performanceUpdates?: Prisma.MemberPerformanceUncheckedUpdateManyWithoutUpdaterNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    projectMembers: number;
    teamMembers: number;
    createdProjects: number;
    createdTeams: number;
    createdTasks: number;
    assignedTasks: number;
    performanceUpdates: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    projectMembers?: boolean | UserCountOutputTypeCountProjectMembersArgs;
    teamMembers?: boolean | UserCountOutputTypeCountTeamMembersArgs;
    createdProjects?: boolean | UserCountOutputTypeCountCreatedProjectsArgs;
    createdTeams?: boolean | UserCountOutputTypeCountCreatedTeamsArgs;
    createdTasks?: boolean | UserCountOutputTypeCountCreatedTasksArgs;
    assignedTasks?: boolean | UserCountOutputTypeCountAssignedTasksArgs;
    performanceUpdates?: boolean | UserCountOutputTypeCountPerformanceUpdatesArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountProjectMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectMemberWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountTeamMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeamMemberWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCreatedProjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCreatedTeamsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TeamWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCreatedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAssignedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaskWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPerformanceUpdatesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MemberPerformanceWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    projectMembers?: boolean | Prisma.User$projectMembersArgs<ExtArgs>;
    teamMembers?: boolean | Prisma.User$teamMembersArgs<ExtArgs>;
    createdProjects?: boolean | Prisma.User$createdProjectsArgs<ExtArgs>;
    createdTeams?: boolean | Prisma.User$createdTeamsArgs<ExtArgs>;
    createdTasks?: boolean | Prisma.User$createdTasksArgs<ExtArgs>;
    assignedTasks?: boolean | Prisma.User$assignedTasksArgs<ExtArgs>;
    performance?: boolean | Prisma.User$performanceArgs<ExtArgs>;
    performanceUpdates?: boolean | Prisma.User$performanceUpdatesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "name" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    projectMembers?: boolean | Prisma.User$projectMembersArgs<ExtArgs>;
    teamMembers?: boolean | Prisma.User$teamMembersArgs<ExtArgs>;
    createdProjects?: boolean | Prisma.User$createdProjectsArgs<ExtArgs>;
    createdTeams?: boolean | Prisma.User$createdTeamsArgs<ExtArgs>;
    createdTasks?: boolean | Prisma.User$createdTasksArgs<ExtArgs>;
    assignedTasks?: boolean | Prisma.User$assignedTasksArgs<ExtArgs>;
    performance?: boolean | Prisma.User$performanceArgs<ExtArgs>;
    performanceUpdates?: boolean | Prisma.User$performanceUpdatesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        projectMembers: Prisma.$ProjectMemberPayload<ExtArgs>[];
        teamMembers: Prisma.$TeamMemberPayload<ExtArgs>[];
        createdProjects: Prisma.$ProjectPayload<ExtArgs>[];
        createdTeams: Prisma.$TeamPayload<ExtArgs>[];
        createdTasks: Prisma.$TaskPayload<ExtArgs>[];
        assignedTasks: Prisma.$TaskPayload<ExtArgs>[];
        performance: Prisma.$MemberPerformancePayload<ExtArgs> | null;
        performanceUpdates: Prisma.$MemberPerformancePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: $Enums.WorkspaceRole;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    projectMembers<T extends Prisma.User$projectMembersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$projectMembersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    teamMembers<T extends Prisma.User$teamMembersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$teamMembersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    createdProjects<T extends Prisma.User$createdProjectsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$createdProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    createdTeams<T extends Prisma.User$createdTeamsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$createdTeamsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    createdTasks<T extends Prisma.User$createdTasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$createdTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    assignedTasks<T extends Prisma.User$assignedTasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$assignedTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    performance<T extends Prisma.User$performanceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$performanceArgs<ExtArgs>>): Prisma.Prisma__MemberPerformanceClient<runtime.Types.Result.GetResult<Prisma.$MemberPerformancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    performanceUpdates<T extends Prisma.User$performanceUpdatesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$performanceUpdatesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MemberPerformancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'WorkspaceRole'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.projectMembers
 */
export type User$projectMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: Prisma.ProjectMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: Prisma.ProjectMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProjectMemberInclude<ExtArgs> | null;
    where?: Prisma.ProjectMemberWhereInput;
    orderBy?: Prisma.ProjectMemberOrderByWithRelationInput | Prisma.ProjectMemberOrderByWithRelationInput[];
    cursor?: Prisma.ProjectMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectMemberScalarFieldEnum | Prisma.ProjectMemberScalarFieldEnum[];
};
/**
 * User.teamMembers
 */
export type User$teamMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: Prisma.TeamMemberSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: Prisma.TeamMemberOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TeamMemberInclude<ExtArgs> | null;
    where?: Prisma.TeamMemberWhereInput;
    orderBy?: Prisma.TeamMemberOrderByWithRelationInput | Prisma.TeamMemberOrderByWithRelationInput[];
    cursor?: Prisma.TeamMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamMemberScalarFieldEnum | Prisma.TeamMemberScalarFieldEnum[];
};
/**
 * User.createdProjects
 */
export type User$createdProjectsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Project
     */
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
/**
 * User.createdTeams
 */
export type User$createdTeamsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: Prisma.TeamSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Team
     */
    omit?: Prisma.TeamOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TeamInclude<ExtArgs> | null;
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput | Prisma.TeamOrderByWithRelationInput[];
    cursor?: Prisma.TeamWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TeamScalarFieldEnum | Prisma.TeamScalarFieldEnum[];
};
/**
 * User.createdTasks
 */
export type User$createdTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: Prisma.TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput | Prisma.TaskOrderByWithRelationInput[];
    cursor?: Prisma.TaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaskScalarFieldEnum | Prisma.TaskScalarFieldEnum[];
};
/**
 * User.assignedTasks
 */
export type User$assignedTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: Prisma.TaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Task
     */
    omit?: Prisma.TaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TaskInclude<ExtArgs> | null;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput | Prisma.TaskOrderByWithRelationInput[];
    cursor?: Prisma.TaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaskScalarFieldEnum | Prisma.TaskScalarFieldEnum[];
};
/**
 * User.performance
 */
export type User$performanceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPerformance
     */
    select?: Prisma.MemberPerformanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MemberPerformance
     */
    omit?: Prisma.MemberPerformanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MemberPerformanceInclude<ExtArgs> | null;
    where?: Prisma.MemberPerformanceWhereInput;
};
/**
 * User.performanceUpdates
 */
export type User$performanceUpdatesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberPerformance
     */
    select?: Prisma.MemberPerformanceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MemberPerformance
     */
    omit?: Prisma.MemberPerformanceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MemberPerformanceInclude<ExtArgs> | null;
    where?: Prisma.MemberPerformanceWhereInput;
    orderBy?: Prisma.MemberPerformanceOrderByWithRelationInput | Prisma.MemberPerformanceOrderByWithRelationInput[];
    cursor?: Prisma.MemberPerformanceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MemberPerformanceScalarFieldEnum | Prisma.MemberPerformanceScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map