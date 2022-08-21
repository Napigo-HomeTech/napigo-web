import { User } from "firebase/auth";
import { getUser } from "@/lib/Auth";
import { accountStore } from "@/lib/Firestore";
import { Account, AccountRole, AccountStatus } from "@/types";

/**
 * Storing the new user's account record into Firebase
 * @param user
 * @returns
 */
export const createAccountRecord = async (user: User) => {
  try {
    const account = {
      displayName: user.displayName ?? null,
      photo_url: user.photoURL ?? null,
      account_status: AccountStatus.ACTIVE,
      email: user.email,
      last_logged_in: new Date().toISOString(),
      role:
        user.email === "napigo.boss@gmail.com"
          ? AccountRole.SUPERADMIN
          : AccountRole.STANDARD,
      uid: user.uid,
    } as Account;

    await accountStore.saveAccount(account);
    return;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param newEmail
 */
export const updateAccountEmail = async (newEmail: string): Promise<void> => {
  try {
    const user = getUser() as User;
    await accountStore.updateAccount(user.uid, newEmail);
    return;
  } catch (err) {
    throw err;
  }
};
