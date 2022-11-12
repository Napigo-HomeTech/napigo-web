import { StyleFunctionProps } from "@chakra-ui/react";
/**
 *
 */
export const baseStyles = {
  global: (props: StyleFunctionProps) => ({
    "html, body": {
      background: props.colorMode === "dark" ? "gray.900" : "gray.50",
    },
  }),
};
