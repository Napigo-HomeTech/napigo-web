import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import { FormState } from "@/types";
import React, { useCallback, useState } from "react";
import { useMobileSetting } from "..";

export const useMobileUpdateForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { setFormType } = useMobileSetting();

  const submitHandler = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();

      const elem = document.getElementById("mobile_no") as HTMLInputElement;
      elem.blur();
      // const { value } = elem;

      setFormState("submitting");
      freezePage(true);

      delayInvoke(async () => {
        setFormState("onsuccess");
        /**
         * TODO : rethinking design for extracting the OTP form to
         * be more reusable and standalone context
         */
        freezePage(false);
      });
    },
    [formState]
  );

  return {
    formState,
    submitError,
    submitHandler,
    setSubmitError,
  };
};
