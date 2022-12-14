import { DefaultCallback } from "@/types";
import { ConfirmationResult } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";
import { OtpForm } from "./OtpForm";
import { PhoneNumberForm } from "./PhoneNumberForm";

type ContextProps = {
  verificationId: string | null;
  setVerificationId: (id: string) => void;
  confirmationResult: ConfirmationResult | null;
  setConfirmationResult: (obj: ConfirmationResult) => void;
  setFormType: (type: FormType) => void;
  cachePhoneNumber: string | null;
  setCachePhoneNumber: (phoneNum: string) => void;
};

type FormType = "phone-number" | "otp";

const AddMobileFormContext = createContext<ContextProps>({
  verificationId: null,
  setVerificationId: DefaultCallback,
  confirmationResult: null,
  setConfirmationResult: DefaultCallback,
  setFormType: DefaultCallback,
  cachePhoneNumber: null,
  setCachePhoneNumber: DefaultCallback,
});

/**
 *
 * @returns
 */
export const useAddMobileFormContext = () => {
  return useContext(AddMobileFormContext);
};

/**
 *
 * @returns
 */
export const MobileForm: React.FC = () => {
  const [formType, setFormType] = useState<FormType>("phone-number");
  const [verificationId, setVerificationId] = useState<string | null>(null);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [cachePhoneNumber, setCachePhoneNumber] = useState<string | null>(null);

  const value = {
    verificationId,
    setVerificationId,
    confirmationResult,
    setConfirmationResult,
    setFormType,
    cachePhoneNumber,
    setCachePhoneNumber,
  };

  return (
    <AddMobileFormContext.Provider value={value}>
      {formType === "phone-number" && <PhoneNumberForm />}
      {formType === "otp" && <OtpForm />}
    </AddMobileFormContext.Provider>
  );
};
