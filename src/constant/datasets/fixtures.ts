import authenticationStrings from "./defaults/authentication";
import settingsStrings from "./defaults/settings";
import loadingsStrings from "./defaults/loadings";
import navStrings from "./defaults/nav";
import commonStrings from "./defaults/commons";
import profileStrings from "./defaults/profile";
import financeStrings from "./defaults/finance";

type AuthStringKey = keyof typeof authenticationStrings;
type SettingsKey = keyof typeof settingsStrings;
type LoadingsKey = keyof typeof loadingsStrings;
type NavKey = keyof typeof navStrings;
type CommonKey = keyof typeof commonStrings;
type ProfileKey = keyof typeof profileStrings;
type FinanceKey = keyof typeof financeStrings;

type StringsMessageKey =
  | AuthStringKey
  | SettingsKey
  | LoadingsKey
  | NavKey
  | CommonKey
  | ProfileKey
  | FinanceKey;

export const fixtures = {
  authenticationStrings: { ...authenticationStrings },
  settingsStrings: { ...settingsStrings },
  loadingsStrings: { ...loadingsStrings },
  navStrings: { ...navStrings },
  commonStrings: { ...commonStrings },
  profileStrings: { ...profileStrings },
  financeStrings: { ...financeStrings },
};

/**
 * @deprecated soon will use another simply method to get Strings
 * Text
 * @param key
 * @returns
 */
export const getMessage = (
  key: keyof typeof fixtures,
  messageKey: StringsMessageKey
) => {
  switch (key) {
    case "authenticationStrings": {
      const section = fixtures[key] as typeof authenticationStrings;
      return section[messageKey as AuthStringKey];
    }
    case "settingsStrings": {
      const section = fixtures[key] as typeof settingsStrings;
      return section[messageKey as SettingsKey];
    }
    case "loadingsStrings": {
      const section = fixtures[key] as typeof loadingsStrings;
      return section[messageKey as LoadingsKey];
    }
    case "navStrings": {
      const section = fixtures[key] as typeof navStrings;
      return section[messageKey as NavKey];
    }
    case "commonStrings": {
      const section = fixtures[key] as typeof commonStrings;
      return section[messageKey as CommonKey];
    }
    case "profileStrings": {
      const section = fixtures[key] as typeof profileStrings;
      return section[messageKey as ProfileKey];
    }
    case "financeStrings": {
      const section = fixtures[key] as typeof financeStrings;
      return section[messageKey as FinanceKey];
    }
    default:
      return messageKey;
  }
};
