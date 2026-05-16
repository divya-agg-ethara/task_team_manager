import type { AuthResponse, PublicUser } from "./auth.types";
import type { ChangePasswordInput, LoginInput, SignupInput, UpdateProfileInput } from "./auth.validation";
export declare class AuthService {
    signup(input: SignupInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
    getUserById(id: string): Promise<PublicUser | null>;
    updateProfile(userId: string, input: UpdateProfileInput): Promise<PublicUser>;
    changePassword(userId: string, input: ChangePasswordInput): Promise<void>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map