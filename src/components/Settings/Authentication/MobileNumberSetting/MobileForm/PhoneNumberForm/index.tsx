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
  getOptionByCountry,
  formatPhoneNumber,
} from "@/lib/utils/tel-countries.util";
import { Form } from "@/elements";
import { PhoneIcon } from "@chakra-ui/icons";
import parsePhoneNumber from "libphonenumber-js";
import { usePhoneNumberForm } from "./usePhoneNumberForm";
import { useMobileSetting } from "../..";
import { fixtures } from "@/constant/datasets/fixtures";

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

/**
 *
 * @returns
 */
export const PhoneNumberForm: React.FC = () => {
  const { formType, verifiedPhoneNumber, setFormType } = useMobileSetting();

  /**
   * The Country Value where user have selected, this is to enable
   * AsYouType API to trigger during  onchange phone number input
   */
  const [country, setCountry] = useState<CountryOption | null>(() => {
    if (formType === "onUpdate") {
      return _getSelected(verifiedPhoneNumber ?? "") ?? null;
    }
    return null;
  });
  /**
   * Caching the finalised displayed of the phone number value, normally after
   * formatting using the AsYouType API
   */
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const { submit, submitError, setSubmitError, formState } =
    usePhoneNumberForm();

  const getDefaultSelectedCountry = useCallback(() => {
    return _getSelected(verifiedPhoneNumber ?? "");
  }, [verifiedPhoneNumber]);

  const formatNumber = useCallback(
    (value: string) => {
      let val = value;
      if (country !== null) {
        val = formatPhoneNumber(value, country.value);
      }
      return val;
    },
    [country]
  );

  const disableSendOtp = useMemo(() => {
    return isEmpty(phoneNumber) || isEmpty(country);
  }, [phoneNumber, country]);

  /**
   *
   * @param country
   */
  const handleOnChangeCountry = (country: CountryOption) => {
    if (phoneNumber.length > 0) {
      try {
        setPhoneNumber(
          formatPhoneNumber(phoneNumber, country.value.toUpperCase())
        );
      } catch (err) {
        /**
         * Ignore the error as User may not yet enter any phone number at this
         * point
         */
      }
    }
    setCountry(country);
  };

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
            placeholder={
              fixtures.settingsStrings[
                "authentication.mobileform.notverified.select-country.input.placeholder"
              ]
            }
            defaultValue={getDefaultSelectedCountry()}
            options={countries}
            onChange={(data) => {
              handleOnChangeCountry(data as CountryOption);
            }}
          />
        </Box>
        <Form.TextField
          name="mobile_no"
          id="mobile_no"
          value={phoneNumber}
          placeholder={
            fixtures.settingsStrings[
              "authentication.mobileform.notverified.mobile-no.input.placeholder"
            ]
          }
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
            top={2}
            right={1}
            onClick={() => setSubmitError(null)}
          />
          <Box>
            <AlertTitle>
              {fixtures.commonStrings["alert.error.title"]}
            </AlertTitle>
            <AlertDescription>{submitError} </AlertDescription>
          </Box>
        </Alert>
      )}
      <HStack>
        <Button
          size="sm"
          type="submit"
          isLoading={formState === "submitting"}
          disabled={disableSendOtp}
        >
          {
            fixtures.settingsStrings[
              "authentication.mobileform.notverified.send-otp.buttontext"
            ]
          }
        </Button>
        {formType === "onUpdate" && (
          <Button
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => setFormType("verified")}
          >
            {
              fixtures.settingsStrings[
                "authentication.mobileform.update-no.cancel.buttontext"
              ]
            }
          </Button>
        )}
      </HStack>
    </VStack>
  );
};
