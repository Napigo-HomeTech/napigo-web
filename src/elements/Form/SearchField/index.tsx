import React from "react";
import {
  Input,
  InputProps,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { isEmpty } from "lodash";

interface SearchFieldProps extends Omit<InputProps, "isInvalid"> {
  error?: string;
  label?: string;
}
export const SearchField: React.FC<SearchFieldProps> = (props) => {
  const { error, label, ...rest } = props;
  return (
    <FormControl isInvalid={!isEmpty(error)}>
      {!isEmpty(label) && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input {...rest} type="text" />
        <InputRightElement children={<SearchIcon />} />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
