import { AuthErrorCodes, updateProfile } from "firebase/auth";
import { createAccountRecord } from "@/lib/Accounts";
import { registerMethod } from "@/lib/Auth";
import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { RegisterFormSchema } from "@/schemas/register-form.schema";
import { FormState } from "@/types";
import { GeneralObject } from "@/types/global.type";
import Joi from "joi";

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
                document
                    .getElementById(id)
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    ?.removeEventListener("blur", () => {});
            });
        };
    }, [inputIds]);

    const clearFormErrors = useCallback(() => {
        setInputErrors({});
        setSubmitError(null);
    }, []);

    /** */
    const handleValidationError = useCallback((error: Joi.ValidationError) => {
        /** Update the state with Errors to be display in the input */
        const err = error?.details[0];
        const errPath = err.path[0] as string;
        setInputErrors({ [errPath]: err?.message });
    }, []);

    /** */
    const validateForm = useCallback(() => {
        const formData: Record<string, any> = {};

        Object.values(inputIds).forEach((id) => {
            const input = document.getElementById(id) as HTMLInputElement;
            input.blur();
            formData[id] = input.value;
        });
        return RegisterFormSchema.validate(formData);
    }, [inputIds]);

    /** */
    const handleAuthError = useCallback((code: string) => {
        switch (code) {
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
    }, []);

    /** */
    const handleFormSubmit = useCallback(
        (formData: Record<string, any>) => {
            setFormStatus("submitting");
            freezePage(true);

            delayInvoke(async () => {
                try {
                    const { user } = await registerMethod(
                        formData[inputIds.email],
                        formData[inputIds.psw]
                    );
                    const username = formData[inputIds.username];
                    if (!isEmpty(username)) {
                        await updateProfile(user, { displayName: username });
                    }
                    await createAccountRecord(user);
                    setFormStatus("onsuccess");
                } catch (err: any) {
                    setFormStatus("onerror");
                    if (err.code) {
                        handleAuthError(err.code);
                        return;
                    }
                    setSubmitError("Unable to register account ");
                } finally {
                    freezePage(false);
                }
            });
        },
        [handleAuthError, inputIds.email, inputIds.psw, inputIds.username]
    );

    const submit = useCallback(
        (ev: React.FormEvent) => {
            ev.preventDefault();

            const { error, value: formData } = validateForm();
            if (error) {
                handleValidationError(error);
                return;
            }
            const CAN_SUBMIT = Boolean(
                formStatus === "idle" || formStatus === "onerror"
            );
            if (CAN_SUBMIT) {
                clearFormErrors();
                handleFormSubmit(formData);
            }
        },
        [
            clearFormErrors,
            formStatus,
            handleFormSubmit,
            handleValidationError,
            validateForm,
        ]
    );

    return {
        submit,
        inputErrors,
        submitError,
        formStatus,
        clearFormErrors,
    };
};
