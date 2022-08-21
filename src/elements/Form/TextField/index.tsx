import React from "react";
import {
  Input,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";

interface TextFieldProps extends Omit<InputProps, "isInvalid"> {
  error?: string;
  label?: string;
  helperText?: string;
}
export const TextField: React.FC<TextFieldProps> = (props) => {
  const { error, label, isReadOnly: readOnly, helperText, ...rest } = props;
  return (
    <FormControl isInvalid={!isEmpty(error)}>
      {!isEmpty(label) && <FormLabel>{label}</FormLabel>}
      <Input
        {...rest}
        isReadOnly={readOnly}
        focusBorderColor={readOnly ? "card-border-color" : undefined}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
      {!isEmpty(helperText) && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
