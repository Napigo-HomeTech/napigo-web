import { AuthError, User } from "firebase/auth";

/**
 *
 */
export interface AuthResponseBase {
    error: AuthError | null;
    user: User | null;
}
/**
 *
 */
export type LoginResponse = AuthResponseBase;

/**
 *
 */
export type RegisterResponse = AuthResponseBase;

/**
 *
 */
export type ReauthenticateResponse = Omit<AuthResponseBase, "user">;

export type UpdatePasswordResponse = Omit<AuthResponseBase, "user">;

export type UpdateEmailResponse = Omit<AuthResponseBase, "user">;
