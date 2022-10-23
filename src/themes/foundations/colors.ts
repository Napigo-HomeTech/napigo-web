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
