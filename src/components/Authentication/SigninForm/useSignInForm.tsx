import { AuthError, AuthErrorCodes } from "firebase/auth";
import { loginMethod } from "@/lib/Auth";
import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import React, { useCallback, useEffect, useState } from "react";
import { SignInFormSchema } from "@/schemas/signin-form.schema";
import { FormState } from "@/types";
import { GeneralObject } from "@/types/global.type";

/**
 *
 * @param inputKeys
 * @returns
 */
export const useSignInForm = (inputKeys: GeneralObject) => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [inputErrors, setInputErrors] = useState<GeneralObject>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  /**
   * Clear up any errors when input on blur to avoid user confusion
   * when amending the input for correction.
   */
  useEffect(() => {
    Object.values(inputKeys).forEach((id) => {
      document.getElementById(id)?.addEventListener("blur", () => {
        setInputErrors({});
        setSubmitError(null);
      });
    });

    return () => {
      Object.values(inputKeys).forEach((id) => {
        document
          .getElementById(id)
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          ?.removeEventListener("blur", () => {});
      });
    };
  }, [inputKeys]);

  const clearFormErrors = useCallback(() => {
    setInputErrors({});
    setSubmitError(null);
  }, []);

  /**
   * The Signin form submission process,
   * to login via Firebase Authentication
   * servicew
   * @param ev
   */
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const formData: GeneralObject = {};

    Object.values(inputKeys).forEach((id) => {
      const input = document.getElementById(id) as HTMLInputElement;
      input.blur();

      formData[id] = input.value;
    });

    const { error, value } = SignInFormSchema.validate(formData);

    if (error) {
      /** Update the state with erorrs to be display before submitting request*/
      const err = error?.details[0];
      const errPath = err.path[0] as string;
      setInputErrors({ [errPath]: err?.message });
      return;
    }

    const canSubmit = Boolean(formState === "idle" || formState === "onerror");

    if (canSubmit) {
      clearFormErrors();
      setFormState("submitting");

      freezePage(true);

      /**
       * Proceed with Firebase Signin method
       */
      delayInvoke(async () => {
        try {
          await loginMethod(value[inputKeys.email], value[inputKeys.psw]);
        } catch (err: any) {
          if (err.code) {
            const authError = err as AuthError;
            switch (authError.code) {
              case AuthErrorCodes.INVALID_EMAIL:
              case AuthErrorCodes.INVALID_PASSWORD:
                setSubmitError("Invalid Email / Password");
                break;
              case AuthErrorCodes.USER_DELETED:
                /** Same as User not found error */
                setSubmitError("This email is not registered");
                break;
              default:
                setSubmitError(
                  "Unable to sign in user, please contact Administrator"
                );
                break;
            }
            setFormState("onerror");
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
    formState,
    submitError,
    clearFormErrors,
  };
};
