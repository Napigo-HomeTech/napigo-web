import React, { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useOtpForm } from "./useOtpForm";
import { isEmpty } from "lodash";
import { useAddMobileFormContext } from "..";

/**
 *
 * @returns
 */
export const OtpForm: React.FC = () => {
  const {
    formState,
    submit,
    submitError,
    cachePhoneNumber,
    resendOtp,
    resending,
  } = useOtpForm();

  const { setFormType } = useAddMobileFormContext();

  const [otpValue, setOtpValue] = useState<string | null>();

  const ShowSentNotif = Boolean(
    formState === "idle" ||
      formState === "submitting" ||
      formState === "onerror"
  );
  return (
    <VStack
      gap={2}
      mt={5}
      width="100%"
      justifyContent="start"
      alignItems="flex-start"
    >
      {ShowSentNotif && (
        <FormLabel
          children={
            <>
              Enter the code we\`ve just sent on your mobile phone{" "}
              <Text color="brand.500">{cachePhoneNumber}</Text>
            </>
          }
        />
      )}

      <FormControl
        isInvalid={!isEmpty(submitError)}
        display="flex"
        flexDirection="column"
      >
        <HStack width="100%">
          {formState === "onsuccess" ? (
            <Alert status="success" variant="left-accent">
              <VStack alignItems="flex-start">
                <AlertTitle>Verified!</AlertTitle>
                <AlertDescription>
                  Your Phone number have been added, you can now setup MFA for
                  better security login
                </AlertDescription>
              </VStack>
            </Alert>
          ) : (
            <>
              <PinInput
                isInvalid={!isEmpty(submitError)}
                onChange={(value) => {
                  setOtpValue(value);
                }}
                onComplete={(value) => {
                  submit(value);
                }}
                value={otpValue ?? ""}
              >
                <PinInputField data-id="otp-field" />
                <PinInputField data-id="otp-field" />
                <PinInputField data-id="otp-field" />
                <PinInputField data-id="otp-field" />
                <PinInputField data-id="otp-field" />
                <PinInputField data-id="otp-field" />
              </PinInput>

              {formState === "submitting" && (
                <Spinner
                  color="brand.500"
                  size="md"
                  thickness="2px"
                  emptyColor="brandAlpha.300"
                />
              )}
            </>
          )}
        </HStack>
        <FormErrorMessage>{submitError}</FormErrorMessage>
      </FormControl>
      {resending === "sent" && formState === "idle" && (
        <Text fontSize="sm" color="green.500">
          Re sent OTP to your mobile!
        </Text>
      )}

      {formState === "onerror" && (
        <HStack gap={2}>
          <Button
            size="sm"
            type="button"
            onClick={() => {
              setOtpValue("");
              resendOtp();
            }}
            isLoading={resending === "sending"}
          >
            Resend OTP
          </Button>

          <Button
            size="sm"
            type="button"
            onClick={() => {
              setFormType?.("phone-number");
            }}
          >
            Use another number
          </Button>
        </HStack>
      )}
    </VStack>
  );
};
