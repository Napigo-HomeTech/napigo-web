import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { initializeRecaptchaVerifier, auth } from "@/lib/Auth";
import { AuthError, AuthErrorCodes, PhoneAuthProvider } from "firebase/auth";
import { delayInvoke } from "@/lib/utils/delays";
import { freezePage } from "@/lib/Dom";

type MobileAuthFormState =
  | "idle"
  | "sending-sms"
  | "submit-number-error"
  | "pending-otp"
  | "verifying-otp"
  | "otp-success"
  | "otp-error";

/**
 *
 * @param phoneNumber
 */
export const useMobileAddForm = () => {
  const [formState, setFormState] = useState<MobileAuthFormState>("idle");
  const [inputErrors, setInputErrors] = useState<Record<string, any>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const clearFormErrors = () => {
    setInputErrors({});
    setSubmitError(null);
  };

  const setFormBackIdle = () => {
    setFormState("idle");
  };
  /**
   * Form handler for requesting phone number input,
   * This will submit number to firebase and trigger SMS send for OTP to
   * the targeted user phone
   * @param ev
   */
  const submitPhoneNumber = (ev: React.FormEvent) => {
    ev.preventDefault();

    const { value: phoneNumber } = document.getElementById(
      "mobile_no"
    ) as HTMLInputElement;

    delayInvoke(async () => {
      setFormState("sending-sms");
      freezePage(true);
      try {
        initializeRecaptchaVerifier();
        const verifier = window.recaptchaVerifier;

        const provider = new PhoneAuthProvider(auth);
        const verificationId = await provider.verifyPhoneNumber(
          phoneNumber,
          verifier
        );

        setVerificationId(verificationId);
        setFormState("pending-otp");
        clearFormErrors();
      } catch (err: any) {
        setFormState("submit-number-error");
        if (err.code) {
          const authError = err as AuthError;
          switch (authError.code) {
            case AuthErrorCodes.INVALID_PHONE_NUMBER:
              setInputErrors({ ["mobile_no"]: "Invalid Mobile Number" });
            default: {
              setSubmitError(
                "Unable to send OTP request due to unknown Mobile number format"
              );
            }
          }
          return;
        }
        setSubmitError(
          "Unable to send OTP request due to unknown Mobile number format"
        );
      } finally {
        freezePage(false);
      }
    });
  };

  /**
   * Form handler for requesting the valid OTP
   * @param ev
   */
  const submitOtp = (ev: React.FormEvent) => {
    ev.preventDefault();
  };

  return {
    formState,
    submitPhoneNumber,
    submitOtp,
    inputErrors,
    submitError,
    setFormBackIdle,
  };
};
