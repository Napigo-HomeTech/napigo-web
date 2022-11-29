import React from "react";
import {
  Input,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";

interface TextFieldProps extends Omit<InputProps, "isInvalid"> {
  /**
   *
   *
   */
  inputRightElement?: React.ReactElement;
  /**
   *
   */
  inputLeftElement?: React.ReactElement;
  /**
   *
   *
   */
  inputRightAddon?: React.ReactElement;
  /**
   *
   */
  inputLeftAddon?: React.ReactElement;
  error?: string;
  label?: string;
  helperText?: string;
  containerWidth?: "full" | "auto";
  ref?: React.RefObject<HTMLInputElement>;
}

export const TextField = React.forwardRef((props: TextFieldProps, ref: any) => {
  const {
    error,
    label,
    isReadOnly: readOnly,
    helperText,
    inputRightElement,
    inputLeftElement,
    containerWidth = "full",
    ...rest
  } = props;

  return (
    <FormControl
      isInvalid={!isEmpty(error)}
      width={containerWidth == "full" ? "100%" : "auto"}
    >
      {!isEmpty(label) && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {inputLeftElement && <>{inputLeftElement}</>}
        <Input
          pointerEvents={readOnly ? "none" : undefined}
          cursor={readOnly ? "default" : "text"}
          pl={inputLeftElement ? "2.4rem" : undefined}
          pr={inputRightElement ? "2.4rem" : undefined}
          ref={ref}
          {...rest}
          isReadOnly={readOnly}
          focusBorderColor={readOnly ? "border" : undefined}
        />

        {inputRightElement && <>{inputRightElement}</>}
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
      {!isEmpty(helperText) && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});
TextField.displayName = "TextField";
