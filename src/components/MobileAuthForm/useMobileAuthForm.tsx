import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { FormState } from "@/types";
import { initializeRecaptchaVerifier } from "@/lib/Auth";

/**
 *
 * @param phoneNumber
 */
export const useMobileAuthForm = (phoneNumber: string) => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [inputErrors, setInputErrors] = useState<Record<string, any>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log(phoneNumber);
    console.log(window.recaptchaVerifier);
  };

  useEffect(() => {
    if (!isEmpty(phoneNumber)) {
      initializeRecaptchaVerifier();
    }
  }, [phoneNumber]);

  return {
    submit,
    formState,
    inputErrors,
    submitError,
  };
};
