import { freezePage } from "@/lib/Dom";
import { delayInvoke } from "@/lib/utils/delays";
import { FormState } from "@/types";
import { useCallback, useState } from "react";
import { useAddMobileFormContext } from "..";
import { useMobileSetting } from "../..";

const _getAllPinInput = () => {
  return document.querySelectorAll('[data-id="otp-field"]');
};

/**
 *
 */
export const useOtpForm = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [resending, setResending] = useState<"sending" | "sent" | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { verificationId, cachePhoneNumber } = useAddMobileFormContext();
  const { setFormType, setNumber, isRecentlyVerified } = useMobileSetting();

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
        freezePage(false);
        setFormState("onsuccess");
        setNumber(cachePhoneNumber ?? "");
        setFormType("verified");
        isRecentlyVerified(true);
      });
    },
    [formState]
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
    });
  }, []);

  return {
    submit,
    formState,
    submitError,
    resendOtp,
    cachePhoneNumber,
    resending,
  };
};
