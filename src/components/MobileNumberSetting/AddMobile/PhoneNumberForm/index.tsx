import React, { useCallback, useMemo, useState } from "react";
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
import { OptionBase, Select } from "chakra-react-select";
import countriesRawData from "../countriesRawData";
import getCountryFlag from "country-flag-icons/unicode";
import { Form } from "@/elements";
import { PhoneIcon } from "@chakra-ui/icons";
import parsePhoneNumber, { AsYouType, CountryCode } from "libphonenumber-js";
import { usePhoneNumberForm } from "./usePhoneNumberForm";
import { isEmpty } from "lodash";

interface CountryOption extends OptionBase {
  label: string;
  value: string;
}

/**
 * Compute and transform the listing of countries to the Select
 * data format listing
 * @returns
 */
const _getCountriesOptionData = () => {
  const listing: CountryOption[] = [];

  countriesRawData.forEach((item: any) => {
    const name = item[0];
    const iso = item[2];
    const flagIcon = getCountryFlag(iso);

    listing.push({
      label: `${flagIcon} ${name}`,
      value: iso,
    });
  });

  return listing;
};
const countries = _getCountriesOptionData();

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

  const disabledVerify = useMemo(() => {
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
          <VStack width="100" gap={0} alignItems="flex-start">
            <AlertTitle>Error !</AlertTitle>
            <AlertDescription>{submitError} </AlertDescription>
          </VStack>
        </Alert>
      )}
      <Button
        size="sm"
        type="submit"
        isLoading={formState === "submitting"}
        disabled={disabledVerify}
      >
        Send OTP
      </Button>
    </VStack>
  );
};
