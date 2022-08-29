import React, { useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  HStack,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import {
  getCountriesOptionData,
  CountryOption,
} from "@/lib/utils/tel-countries.util";
import { Form } from "@/elements";
import { PhoneIcon } from "@chakra-ui/icons";
import parsePhoneNumber, { AsYouType, CountryCode } from "libphonenumber-js";
import { usePhoneNumberForm } from "./usePhoneNumberForm";

const countries = getCountriesOptionData();

/**
 *
 * @returns
 */
export const PhoneNumberForm: React.FC = () => {
  const [country, setCountry] = useState<CountryOption | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { submit, submitError, setSubmitError, formState } =
    usePhoneNumberForm();

  const formatNumber = useCallback(
    (value: string) => {
      let val = value;
      if (country !== null) {
        const raw = new AsYouType(
          country.value.toUpperCase() as CountryCode
        ).input(value);
        const parseNumber = parsePhoneNumber(
          raw,
          country.value.toUpperCase() as CountryCode
        );
        val = parseNumber?.formatInternational() ?? value;
        return val;
      }
      return val;
    },
    [country]
  );

  const disableSendOtp = useMemo(() => {
    return isEmpty(phoneNumber) || isEmpty(country);
  }, [phoneNumber, country]);

  return (
    <VStack
      as="form"
      onSubmit={submit}
      gap={2}
      width="100%"
      justifyContent="start"
      alignItems="flex-start"
    >
      <HStack width="inherit">
        <Box width="100%" cursor="pointer">
          <Select
            selectedOptionStyle="check"
            size="md"
            useBasicStyles
            placeholder="Select Country"
            options={countries}
            onChange={(data) => {
              setCountry(data);
            }}
          />
        </Box>
        <Form.TextField
          name="mobile_no"
          id="mobile_no"
          value={phoneNumber}
          placeholder="Mobile number"
          onChange={(ev) => {
            setPhoneNumber(formatNumber(ev.target.value ?? ""));
          }}
          inputLeftElement={
            <InputLeftElement
              children={
                <HStack>
                  <PhoneIcon color="gray.300" />
                </HStack>
              }
            />
          }
        />
      </HStack>
      {/* The container to hold the firebase recaptcha component */}
      <div id="recaptcha-container" />
      {!isEmpty(submitError) && (
        <Alert status="error" variant="left-accent">
          <CloseButton
            position="absolute"
            top={1}
            right={1}
            onClick={() => setSubmitError(null)}
          />
          <AlertTitle>Error !</AlertTitle>
          <AlertDescription>{submitError} </AlertDescription>
        </Alert>
      )}
      <Button
        size="sm"
        type="submit"
        isLoading={formState === "submitting"}
        disabled={disableSendOtp}
      >
        Send OTP
      </Button>
    </VStack>
  );
};
