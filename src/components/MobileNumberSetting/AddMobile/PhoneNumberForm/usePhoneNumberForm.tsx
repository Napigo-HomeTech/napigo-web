import { initializeRecaptchaVerifier } from "@/lib/Auth";
import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import { FormState } from "@/types";
import {
  AuthError,
  AuthErrorCodes,
  getAuth,
  PhoneAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { useAddMobileFormContext } from "..";
const auth = getAuth();

/**
 *
 */
export const usePhoneNumberForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { setFormType, setVerificationId, setCachePhoneNumber } =
    useAddMobileFormContext();

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();

    const elem = document.getElementById("mobile_no") as HTMLInputElement;
    elem.blur();
    const { value } = elem;

    setFormState("submitting");
    freezePage(true);

    delayInvoke(async () => {
      setFormState("onsuccess");
      setCachePhoneNumber?.(value);
      freezePage(false);

      setFormType?.("otp");
      // try {
      //   initializeRecaptchaVerifier();
      //   const verifier = window.recaptchaVerifier;
      //   const provider = new PhoneAuthProvider(auth);
      //   const verificationId = await provider.verifyPhoneNumber(
      //     phoneNumber,
      //     verifier
      //   );
      //   setVerificationId?.(verificationId);
      //   /** show the OTP form after done with sending verify code */
      //   setFormType?.("otp");
      //   setSubmitError(null);
      // } catch (err: any) {
      //   setFormState("onerror");
      //   if (err.code) {
      //     const authError = err as AuthError;
      //     switch (authError.code) {
      //       case AuthErrorCodes.INVALID_PHONE_NUMBER:
      //         setSubmitError("Invalid Mobile Number");
      //       default: {
      //         setSubmitError(
      //           "Unable to send OTP request due to unknown Mobile number format"
      //         );
      //       }
      //     }
      //     return;
      //   }
      //   setSubmitError(
      //     "Unable to send OTP request due to unknown Mobile number format"
      //   );
      // } finally {
      //   freezePage(false);
      // }
    });
  };

  return {
    formState,
    submitError,
    submit,
    setSubmitError,
  };
};
