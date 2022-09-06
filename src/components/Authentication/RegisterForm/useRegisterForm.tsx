import { AuthError, AuthErrorCodes, updateProfile } from "firebase/auth";
import { createAccountRecord } from "@/lib/Accounts";
import { registerMethod } from "@/lib/Auth";
import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { RegisterFormSchema } from "@/schemas/register-form.schema";
import { FormState } from "@/types";
import { GeneralObject } from "@/types/global.type";

/**
 *
 * @param inputIds
 * @returns
 */
export const useRegisterForm = (inputIds: GeneralObject) => {
  const [formStatus, setFormStatus] = useState<FormState>("idle");

  const [inputErrors, setInputErrors] = useState<GeneralObject>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * Clear up any errors when input on blur to avoid user confusion
   * when amending the input for correction.
   */
  useEffect(() => {
    Object.values(inputIds).forEach((id) => {
      document.getElementById(id)?.addEventListener("blur", () => {
        setInputErrors({});
        setSubmitError(null);
      });
    });

    return () => {
      Object.values(inputIds).forEach((id) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        document.getElementById(id)?.removeEventListener("blur", () => {});
      });
    };
  }, [inputIds]);

  const clearFormErrors = useCallback(() => {
    setInputErrors({});
    setSubmitError(null);
  }, []);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const formData: GeneralObject = {};

    Object.values(inputIds).forEach((id) => {
      const input = document.getElementById(id) as HTMLInputElement;
      input.blur();
      formData[id] = input.value;
    });

    const { error, value } = RegisterFormSchema.validate(formData);

    if (error) {
      /** Update the state with Errors to be display in the input */
      const err = error?.details[0];
      const errPath = err.path[0] as string;
      setInputErrors({ [errPath]: err?.message });
      return;
    }

    const canSubmit = Boolean(
      formStatus === "idle" || formStatus === "onerror"
    );

    if (canSubmit) {
      clearFormErrors();
      setFormStatus("submitting");

      freezePage(true);

      delayInvoke(async () => {
        try {
          const { user } = await registerMethod(
            value[inputIds.email],
            value[inputIds.password]
          );

          const username = value[inputIds.username];

          if (!isEmpty(username)) {
            await updateProfile(user, { displayName: username });
          }

          await createAccountRecord(user);

          setFormStatus("onsuccess");
        } catch (err: any) {
          if (err.code) {
            const authError = err as AuthError;
            switch (authError.code) {
              case AuthErrorCodes.EMAIL_EXISTS:
                setSubmitError("Email already registered");
                break;
              case AuthErrorCodes.WEAK_PASSWORD:
                setSubmitError("Password is weak");
                break;
              case AuthErrorCodes.INVALID_EMAIL:
                setSubmitError("Email is an invalid email address");
                break;
              default:
                setSubmitError("Unable to register account");
                break;
            }
            setFormStatus("onerror");
          }
        } finally {
          freezePage(false);
        }
      });
    }
  };

  return {
    submit,
    inputErrors,
    submitError,
    formStatus,
    clearFormErrors,
  };
};
