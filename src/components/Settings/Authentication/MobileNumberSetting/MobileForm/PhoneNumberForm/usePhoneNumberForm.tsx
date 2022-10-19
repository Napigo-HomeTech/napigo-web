import { AuthErrorMessages, getAuthErrorMessage } from "@/constant/error-messages";
import { getUser, initializeRecaptchaVerifier } from "@/lib/Auth";
import { delayInvoke } from "@/lib/utils/delays";
import { FormState } from "@/types";
import { AuthError, getAuth, linkWithPhoneNumber, PhoneAuthProvider } from "firebase/auth";
import React, { useCallback, useState } from "react";
import { useAddMobileFormContext } from "..";
import { useMobileSetting } from "../..";

/**
 *
 */
export const usePhoneNumberForm = () => {
    const user = getUser();
    const auth = getAuth();
    const [formState, setFormState] = useState<FormState>("idle");
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { formType } = useMobileSetting();

    const { setFormType, setCachePhoneNumber, setConfirmationResult, setVerificationId } = useAddMobileFormContext();

    const submit = useCallback(
        (ev: React.FormEvent) => {
            ev.preventDefault();

            const elem = document.getElementById("mobile_no") as HTMLInputElement;
            elem.blur();
            const { value } = elem;
            setFormState("submitting");

            delayInvoke(async () => {
                try {
                    initializeRecaptchaVerifier();
                    const verifier = window.recaptchaVerifier;

                    if (user && formType === "notVerified") {
                        const confirmationResult = await linkWithPhoneNumber(user, value, verifier);
                        setConfirmationResult(confirmationResult);
                    } else if (user && formType === "onUpdate") {
                        const provider = new PhoneAuthProvider(auth);
                        const verId = await provider.verifyPhoneNumber(value, verifier);
                        setVerificationId(verId);
                    }

                    setCachePhoneNumber(value);
                    setFormType?.("otp");
                    setSubmitError(null);
                } catch (err: any) {
                    setFormState("onerror");
                    if (err.code) {
                        const authError = err as AuthError;
                        setSubmitError(getAuthErrorMessage(authError.code));
                        return;
                    }
                    setSubmitError(AuthErrorMessages.COMMON_GENERAL_ERROR);
                }
            });
        },
        [auth, formType, setCachePhoneNumber, setConfirmationResult, setFormType, setVerificationId, user]
    );

    return {
        formState,
        submitError,
        submit,
        setSubmitError,
    };
};
