import {
    getCountries,
    getCountryCallingCode,
    CountryCode,
} from "libphonenumber-js";
import getFlag from "country-flag-icons/unicode";

declare global {
    interface Window {
        phonecodes: CountryPhoneCode[];
    }
}

export type CountryPhoneCode = {
    flag: string;
    code: string;
};
/**
 *
 */
export const initAllCountriesPhoneCode = () => {
    const allCountryCodes = getCountries();
    const dataList: CountryPhoneCode[] = [];

    allCountryCodes.forEach((country: CountryCode) => {
        dataList.push({
            flag: getFlag(country),
            code: getCountryCallingCode(country),
        });
    });

    window.phonecodes = dataList;
};

/** */
export const getPhoneCodes = (): CountryPhoneCode[] => {
    const allCountryCodes = getCountries();
    const dataList: CountryPhoneCode[] = [];

    allCountryCodes.forEach((country: CountryCode) => {
        dataList.push({
            flag: getFlag(country),
            code: getCountryCallingCode(country),
        });
    });
    return dataList;
};
