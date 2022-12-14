import { OptionBase } from "chakra-react-select";
import getCountryFlag from "country-flag-icons/unicode";
import parsePhoneNumber, { AsYouType, CountryCode } from "libphonenumber-js";
import countriesRawData from "./countriesRawData";

export interface CountryOption extends OptionBase {
  label: string;
  value: string;
}

/**
 * Compute and transform the listing of countries to the Select
 * data format listing
 * @returns
 */
export const getCountriesOptionData = () => {
  const options: CountryOption[] = [];

  const n = countriesRawData.length;
  let idx = 0;

  for (; idx < n; idx++) {
    const target = countriesRawData[idx];
    options.push({
      label: `${getCountryFlag(target[2].toString())} ${target[0]}`.toString(),
      value: target[2].toString(),
    });
  }
  return options;
};

/**
 *
 * @param country
 * @returns
 */
export const getOptionByCountry = (
  country: string
): CountryOption | undefined => {
  const list = getCountriesOptionData();

  return list.find(
    (val: CountryOption) => val.value.toLowerCase() === country.toLowerCase()
  );
};

/**
 *
 * @param phoneNumberRaw
 * @param countryCode
 */
export const formatPhoneNumber = (
  phoneNumberRaw: string,
  countryCode: string
) => {
  const code = countryCode.toUpperCase() as CountryCode;
  const raw = new AsYouType(code).input(phoneNumberRaw);
  const parseNumber = parsePhoneNumber(raw, code);
  return parseNumber?.formatInternational() ?? phoneNumberRaw;
};
