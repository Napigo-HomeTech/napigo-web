import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  RecaptchaVerifier,
} from "firebase/auth";
import { freezePage } from "@/lib/Dom";
import { AccountActions, AppContextActions } from "@/lib/Redux";
import { delayInvoke } from "@/lib/utils/delays";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { post } from "../Apis";

declare global {
  interface Window {
    recaptchaVerifier: any;
    phoneVerificationId: any;
  }
}

/** The Auth  SDK instance for Firebase based on current configuration and Firebase project
 * @Reference Firebase/index.js to see full configuration
 */
const firebaseAuth = getAuth();
firebaseAuth.setPersistence(browserLocalPersistence);

/** export the actual firebase auth object to be use within components */
export const auth = firebaseAuth;
/**
 * Normally will be used before updating new password for user
 */
export const reauthenticate = async (user: User, password: string) => {
  const creds = EmailAuthProvider.credential(user.email as string, password);
  await reauthenticateWithCredential(user, creds);
};

/**
 *
 */
export const updatePasswordMethod = async (user: User, newPassword: string) => {
  return updatePassword(user, newPassword);
};

/**
 *
 * @param user
 * @param newEmail
 * @returns
 */
export const updateEmailMethod = async (user: User, newEmail: string) => {
  await updateEmail(user, newEmail);
};

/**
 * This method is the flow for user login via the Firebase authentication service provider
 * @param email
 * @param password
 */
export const loginMethod = async (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

/**
 * This method is the flow for registering new account for user
 * with the unique email address
 * @param email
 * @param password
 * @param nickname
 */
export const registerMethod = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

/**
 * @returns Logged in User
 */
export const getUser = () => {
  const user = firebaseAuth.currentUser;
  return user;
};

/**
 * Check if there is current User logged in upon
 * calling this method.
 * @returns boolean
 */
export const isUserLoggedIn = () => {
  const user = firebaseAuth.currentUser;
  return Boolean(user !== null);
};

/**
 * This method to sent the verificaiton code to the Email address from the User,
 * only use this when current user.emailIsVerified is false
 * @param user
 */
export const sendEmailVerificationMethod = async (user: User) => {
  try {
    await sendEmailVerification(user, {
      url: window.location.origin,
    });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

/**
 * React hooks for component use which handle Logout button clicked
 * @returns
 */
export const useHandleLogoutMethod = () => {
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setLoggingOut(true);
    freezePage(true);

    /** Clear out all app data from cache redux before logout */
    delayInvoke(async () => {
      dispatch(AccountActions.setAccount(null));
      dispatch(AppContextActions.accountReady(false));

      await firebaseAuth.signOut();
      freezePage(false);

      setLoggingOut(false);
    }, 1000);
  };

  return {
    loggingOut,
    handleLogout,
  };
};

export const initializeRecaptchaVerifier = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      callback: (_response: any) => {},
    },
    firebaseAuth
  );
};

/**
 * A api fetch function for retrieving the X-CSRF-Token value from
 * the account-service
 * @param firebaseIdToken
 */
export const getCSRFToken = async (firebaseIdToken: string) => {
  const response = await post(
    "/account-service/csrf",
    {},
    {
      id_token: firebaseIdToken,
    }
  );
  return response.data;
};
