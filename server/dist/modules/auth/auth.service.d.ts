import type { AuthResponse, PublicUser } from "./auth.types";
import type { LoginInput, SignupInput } from "./auth.validation";
export declare class AuthService {
    signup(input: SignupInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
    getUserById(id: string): Promise<PublicUser | null>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map