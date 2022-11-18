import { Colors } from "@chakra-ui/react";
import { TinyColor } from "@ctrl/tinycolor";
import { memoizedGet as get } from "@chakra-ui/utils";

/**
 * Replacing the deprecated function from Chakra UI
 * @param theme
 * @param color
 * @param fallback
 * @returns
 */
export const getColor = (theme: any, color: string, fallback?: () => void) => {
  const hex = get(theme, `colors.${color}`, color);
  const { isValid } = new TinyColor(hex);
  return isValid ? hex : fallback?.();
};

/**
 *
 */
export const colors: Colors = {
  brandAlpha: {
    50: "rgba(35, 164, 106, 0.04)",
    100: "rgba(35, 164, 106, 0.06)",
    200: "rgba(35, 164, 106, 0.08)",
    300: "rgba(35, 164, 106, 0.16)",
    400: "rgba(35, 164, 106, 0.24)",
    500: "rgba(35, 164, 106, 0.36)",
    600: "rgba(35, 164, 106, 0.48)",
    700: "rgba(35, 164, 106, 0.64)",
    800: "rgba(35, 164, 106, 0.80)",
    900: "rgba(35, 164, 106, 0.92)",
  },
  brand: {
    50: "#EAF6F1",
    100: "#D3EDE1",
    200: "#A7DBC3",
    300: "#7BC8A6",
    400: "#4FB688",
    500: "#23A46A",
    600: "#1A7B50",
    700: "#125235",
    800: "#09291B",
    900: "#04100B",
  },
  secondary_old: {
    50: "#FFF4E7",
    100: "#FDE9CE",
    200: "#FCD39D",
    300: "#FABC6B",
    400: "#F9A63A",
    500: "#F79009",
    600: "#B96C07",
    700: "#7C4805",
    800: "#3E2402",
    900: "#190E01",
  },
  secondary: {
    50: "#F6EAEF",
    100: "#EDD3DF",
    200: "#DBA7BE",
    300: "#C87B9E",
    400: "#B64F7D",
    500: "#A4235D",
    600: "#7B1A46",
    700: "#52122F",
    800: "#290917",
    900: "#100409",
  },
  gray: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
};
