import React, { useCallback, useMemo, useState } from "react";
import { Form } from "@/elements";
import {
  CountryOption,
  getCountriesOptionData,
  getOptionByCountry,
} from "@/lib/utils/tel-countries.util";
import { PhoneIcon } from "@chakra-ui/icons";
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
import parsePhoneNumber, { AsYouType, CountryCode } from "libphonenumber-js";
import { useMobileSetting } from "..";
import { useMobileUpdateForm } from "./useMobileUpdateForm";
import { isEmpty } from "lodash";

const countries = getCountriesOptionData();

/**
 *
 * @param verifiedPhoneNumber
 * @returns
 */
const _getSelected = (verifiedPhoneNumber: string) => {
  const phoneNumber = parsePhoneNumber(verifiedPhoneNumber ?? "");
  const targetItem = getOptionByCountry(phoneNumber?.country ?? "");
  return targetItem;
};

export const MobileUpdateForm: React.FC = () => {
  const { verifiedPhoneNumber, setFormType } = useMobileSetting();

  const { formState, submitHandler, submitError, setSubmitError } =
    useMobileUpdateForm();

  const [country, setCountry] = useState<CountryOption | null>(() => {
    return _getSelected(verifiedPhoneNumber ?? "") ?? null;
  });
  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    return verifiedPhoneNumber ?? "";
  });

  /**
   *
   */
  const getDefaultSelectedCountry = useCallback(() => {
    return _getSelected(verifiedPhoneNumber ?? "");
  }, [verifiedPhoneNumber]);

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
      onSubmit={submitHandler}
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
            placeholder="Selected Country"
            options={countries}
            defaultValue={getDefaultSelectedCountry()}
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
      <HStack>
        <Button
          size="sm"
          type="submit"
          isLoading={formState === "submitting"}
          disabled={disableSendOtp}
        >
          Send OTP
        </Button>
        <Button
          size="sm"
          type="button"
          variant="ghost"
          onClick={() => setFormType("verified")}
        >
          Cancel
        </Button>
      </HStack>
    </VStack>
  );
};
