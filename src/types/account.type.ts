/**
 *
 */
export enum AccountStatus {
  ACTIVE = "ACTIVE",
  PENDING_EMAIL_VER = "PENDING_EMAIL_VER",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

/**
 *
 */
export enum AccountRole {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  DEV = "DEV",
  STANDARD = "STANDARD",
}
/**
 *
 */
export type Account = {
  displayName: string | null;
  photo_url: string | null;
  account_status: AccountStatus;
  email: string;
  last_logged_in: string;
  role: AccountRole;
  uid: string;
  phoneNumber: string | null;
};
