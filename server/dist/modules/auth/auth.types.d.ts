import type { PublicUser } from "../../types/user";
export type { PublicUser };
export interface AuthTokens {
    accessToken: string;
}
export interface AuthResponse {
    user: PublicUser;
    tokens: AuthTokens;
}
//# sourceMappingURL=auth.types.d.ts.map