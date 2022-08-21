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
export interface LoginResponse extends AuthResponseBase {}

/**
 *
 */
export interface RegisterResponse extends AuthResponseBase {}

/**
 *
 */
export interface ReauthenticateResponse
  extends Omit<AuthResponseBase, "user"> {}

export interface UpdatePasswordResponse
  extends Omit<AuthResponseBase, "user"> {}

export interface UpdateEmailResponse extends Omit<AuthResponseBase, "user"> {}
