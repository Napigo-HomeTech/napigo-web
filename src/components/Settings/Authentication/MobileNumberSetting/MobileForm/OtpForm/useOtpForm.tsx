import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import { FormState } from "@/types";
import { useCallback, useState } from "react";
import { useAddMobileFormContext } from "..";
import { useMobileSetting } from "../..";
import {
  AuthError,
  getAuth,
  linkWithPhoneNumber,
  PhoneAuthProvider,
  updatePhoneNumber,
  User,
} from "firebase/auth";
import {
  AuthErrorMessages,
  getAuthErrorMessage,
} from "@/constant/error-messages";
import { getUser, initializeRecaptchaVerifier } from "@/lib/Auth";

const _getAllPinInput = () => {
  return document.querySelectorAll('[data-id="otp-field"]');
};

/**
 *
 */
export const useOtpForm = () => {
  const auth = getAuth();
  const user = getUser();
  const [formState, setFormState] = useState<FormState>("idle");
  const [resending, setResending] = useState<"sending" | "sent" | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    verificationId,
    setVerificationId,
    confirmationResult,
    setConfirmationResult,
    cachePhoneNumber,
  } = useAddMobileFormContext();
  const { formType, setFormType, setNumber, isRecentlyVerified } =
    useMobileSetting();

  /**
   *
   * @param code
   */
  const submit = useCallback(
    (value: string) => {
      setFormState("submitting");

      const targetElem = _getAllPinInput();
      targetElem.forEach((item) => {
        const el = item as HTMLInputElement;
        el?.blur();
      });

      freezePage(true);
      delayInvoke(async () => {
        try {
          if (formType === "notVerified") {
            if (confirmationResult) {
              await confirmationResult.confirm(value);
            }
          } else if (formType === "onUpdate") {
            const cred = PhoneAuthProvider.credential(
              verificationId ?? "",
              value
            );
            await updatePhoneNumber(user as User, cred);
          }
          setSubmitError(null);
          setFormState("onsuccess");
          setNumber(cachePhoneNumber ?? "");
          isRecentlyVerified(true);
          setFormType("verified");
        } catch (err: any) {
          setFormState("onerror");
          if (err.code) {
            const authError = err as AuthError;

            setSubmitError(getAuthErrorMessage(authError.code));
            return;
          }
          setSubmitError(AuthErrorMessages.COMMON_GENERAL_ERROR);
        } finally {
          freezePage(false);
        }
      });
    },
    [
      cachePhoneNumber,
      confirmationResult,
      formType,
      isRecentlyVerified,
      setFormType,
      setNumber,
      user,
      verificationId,
    ]
  );

  const resendOtp = useCallback(() => {
    /**
     * Making sure the form have no errors
     */
    setSubmitError(null);
    setResending("sending");
    freezePage(true);

    delayInvoke(async () => {
      setResending("sent");
      setFormState("idle");
      freezePage(false);
      initializeRecaptchaVerifier();

      const verifier = window.recaptchaVerifier;
      if (user && formType === "notVerified") {
        const confirmationResult = await linkWithPhoneNumber(
          user,
          cachePhoneNumber ?? "",
          verifier
        );
        setConfirmationResult(confirmationResult);
      } else if (user && formType === "onUpdate") {
        const provider = new PhoneAuthProvider(auth);
        const verId = await provider.verifyPhoneNumber(
          cachePhoneNumber ?? "",
          verifier
        );
        setVerificationId(verId);
      }
    });
  }, [
    auth,
    cachePhoneNumber,
    formType,
    setConfirmationResult,
    setVerificationId,
    user,
  ]);

  return {
    submit,
    formState,
    submitError,
    resendOtp,
    cachePhoneNumber,
    resending,
  };
};
