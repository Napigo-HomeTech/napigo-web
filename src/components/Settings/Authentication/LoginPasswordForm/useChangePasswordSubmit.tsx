import { AuthError, AuthErrorCodes, User } from "firebase/auth";
import { getUser, reauthenticate, updatePasswordMethod } from "@/lib/Auth";
import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import React, { useCallback, useEffect, useState } from "react";
import { ChangePasswordFormSchema } from "@/schemas/change-password-form.schema";
import { FormState, GeneralObject } from "@/types";

/**
 * hooks for handling password submission into firebase
 * , will also handle errors
 */
export const useChangePasswordSubmit = (inputKeys: GeneralObject) => {
  const user = getUser() as User;
  const [formState, setFormState] = useState<FormState>("idle");
  const [inputErrors, setInputErrors] = useState<GeneralObject>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearFormErrors = useCallback(() => {
    setInputErrors({});
    setSubmitError(null);
  }, []);

  /**
   * Clean up for state if unmounted without submit
   */
  useEffect(() => {
    Object.values(inputKeys).forEach((id) => {
      document.getElementById(id)?.addEventListener("blur", () => {
        clearFormErrors();
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
  }, [clearFormErrors, inputKeys]);

  const resetForm = () => {
    clearFormErrors();
    setFormState("idle");
  };

  /**
   *
   * @param ev
   * @returns
   */
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const formData: GeneralObject = {};
    Object.values(inputKeys).forEach((id) => {
      const input = document.getElementById(id) as HTMLInputElement;
      input.blur();
      formData[id] = input.value;
    });
    const { error, value } = ChangePasswordFormSchema.validate(formData);
    if (error) {
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
      delayInvoke(async () => {
        try {
          await reauthenticate(user, value["old-password"]);
          await updatePasswordMethod(user, value["new-password"]);
          setFormState("onsuccess");
          clearFormErrors();
        } catch (err) {
          setFormState("onerror");
          const authError = err as AuthError;
          if (authError.code === AuthErrorCodes.INVALID_PASSWORD) {
            setInputErrors({ "old-password": "Wrong Password" });
          }
          setSubmitError("Unable to change password");
        } finally {
          freezePage(false);
        }
      });
    }
  };

  return {
    submit,
    formState,
    inputErrors,
    submitError,
    resetForm,
  };
};
