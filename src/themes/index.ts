import { extendTheme } from "@chakra-ui/react";
import { colors } from "./foundations/colors";
import { fonts } from "./foundations/fonts";
import { baseStyles as styles } from "./foundations/baseStyles";
import { shadows } from "./foundations/shadows";
import { semanticTokens } from "./foundations/semanticTokens";
import { components } from "./components";

export const appTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  semanticTokens,
  colors,
  styles,
  fonts,
  shadows,
  components,
});
