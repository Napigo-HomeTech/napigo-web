import {
  FormControl,
  InputGroup,
  Input,
  HStack,
  Box,
  InputLeftElement,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import getCountryFlag from "country-flag-icons/unicode";
import { PhoneIcon } from "@chakra-ui/icons";
import CountriesData from "./countriesRawData";
import { OptionBase, Select } from "chakra-react-select";
import parsePhoneNumber, { AsYouType, CountryCode } from "libphonenumber-js";
import { isEmpty } from "lodash";
import { useMobileAuthForm } from "./useMobileAuthForm";

interface CountryOption extends OptionBase {
  label: string;
  value: string;
}

const getCountriesOptionData = () => {
  const listing: CountryOption[] = [];

  CountriesData.forEach((item: any) => {
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

/**
 *
 * @returns
 */
export const MobileAuthForm: React.FC = () => {
  const datas = useMemo(() => getCountriesOptionData(), []);
  const [selected, setSelected] = useState<CountryOption | null>(null);
  const [input, setInput] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { submit, formState, submitError, inputErrors } =
    useMobileAuthForm(input);

  /**
   * Using AsYouType to auto format the value displayed when typing
   * provided the country must be selected first
   */
  const formatNumber = useCallback(
    (value: string) => {
      let val = value;
      if (selected !== null) {
        const raw = new AsYouType(
          selected.value.toUpperCase() as CountryCode
        ).input(value);
        const parseNumber = parsePhoneNumber(
          raw,
          selected.value.toUpperCase() as CountryCode
        );
        val = parseNumber?.formatInternational() ?? value;
        return val;
      }
      return val;
    },
    [selected]
  );

  const disabledVerify = useMemo(() => {
    return isEmpty(input);
  }, [input]);

  return (
    <VStack
      as={"form"}
      onSubmit={submit}
      gap={2}
      width="100%"
      justifyContent="start"
      alignItems="flex-start"
    >
      <HStack width="inherit">
        <Box width="100%">
          <Select
            selectedOptionStyle="check"
            size="md"
            useBasicStyles
            placeholder="Select country"
            options={datas}
            onChange={(data) => {
              setSelected(data);
            }}
          />
        </Box>

        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <HStack>
                  <PhoneIcon color="gray.300" />
                </HStack>
              }
            />
            <Input
              pr="4rem"
              name="mobile_no"
              placeholder="Mobile number"
              value={input}
              onChange={(ev) => {
                setInput(formatNumber(ev.target.value ?? ""));
              }}
            />
          </InputGroup>
        </FormControl>
      </HStack>
      {/* The container to hold the firebase recaptcha component */}
      <div id="recaptcha-container" />

      <Button size="sm" type="submit" disabled={disabledVerify}>
        Verify Number
      </Button>
    </VStack>
  );
};
