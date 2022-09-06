import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  IconButton,
  InputProps,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { MdVisibility as VisibleIcon } from "react-icons/md";
import { MdVisibilityOff as VisibleOffIcon } from "react-icons/md";
import { isEmpty } from "lodash";

const ShowIcon = () => {
  return <Icon as={VisibleIcon} />;
};

const HideIcon = () => {
  return <Icon as={VisibleOffIcon} />;
};

interface PasswordFieldProps extends Omit<InputProps, "isInvalid"> {
  label?: string;
  error?: string;
  alwaysMask?: boolean;
  isReadOnly?: boolean;
  helperText?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const {
    id,
    placeholder,
    size,
    label,
    error,
    alwaysMask,
    helperText,
    isReadOnly: readOnly,
    ...rest
  } = props;

  const [show, setShow] = useState<boolean>(false);

  return (
    <FormControl isInvalid={!isEmpty(error)}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          cursor={readOnly ? "default" : "text"}
          pointerEvents={readOnly ? "none" : undefined}
          pr={"10px"}
          id={id}
          size={size ?? "md"}
          type={!alwaysMask && show ? "text" : "password"}
          placeholder={placeholder}
          colorScheme="brand"
          isReadOnly={readOnly}
          focusBorderColor={readOnly ? "card-border-color" : undefined}
          {...rest}
        />
        {!alwaysMask && (
          <InputRightElement padding={"5px"}>
            <IconButton
              tabIndex={-1}
              _hover={{ background: "transparent" }}
              _active={{ background: "transparent" }}
              variant="ghost"
              backgroundColor={"transparent"}
              onClick={() => setShow(!show)}
              aria-label={show ? "password visible" : "password hidden"}
              icon={show ? <ShowIcon /> : <HideIcon />}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
      {!isEmpty(helperText) && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
