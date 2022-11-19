import React, { useState } from "react";
import currency from "currency.js";
import {
  Input,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";

interface CurrencyFieldProps extends Omit<InputProps, "isInvalid"> {
  inputRightElement?: React.ReactElement;
  inputLeftElement?: React.ReactElement;
  inputRightAddon?: React.ReactElement;
  inputLeftAddon?: React.ReactElement;
  error?: string;
  label?: string;
  helperText?: string;
  containerWidth?: "full" | "auto";
  onInputChange?: (val: string) => void;
}
export const CurrencyField: React.FC<CurrencyFieldProps> = (props) => {
  const {
    error,
    label,
    isReadOnly: readOnly,
    helperText,
    inputRightElement,
    inputLeftElement,
    containerWidth = "full",
    onInputChange,
    defaultValue,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState<string>(defaultValue as string);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
  };

  const onBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const cur = currency(ev.target.value, {
      symbol: "",
      precision: 2,
    }).format();
    setInputValue(cur);
    onInputChange?.(cur);
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.code === "ArrowUp") {
      const cur = currency(inputValue, {
        symbol: "",
        precision: 2,
      })
        .add(1)
        .format();
      setInputValue(cur);
    }
    if (ev.code === "ArrowDown") {
      const cur = currency(inputValue, {
        symbol: "",
        precision: 2,
      })
        .subtract(1)
        .format();
      setInputValue(cur);
    }
    if (ev.code === "Enter") {
      ev.currentTarget.blur();
    } else return;
  };

  return (
    <FormControl
      isInvalid={!isEmpty(error)}
      width={containerWidth == "full" ? "100%" : "auto"}
    >
      {!isEmpty(label) && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children="$"
        />
        <Input
          onKeyDown={onKeyDown}
          pointerEvents={readOnly ? "none" : undefined}
          cursor={readOnly ? "default" : "text"}
          pl={inputLeftElement ? "2.4rem" : undefined}
          pr={inputRightElement ? "2.4rem" : undefined}
          onChange={onChange}
          onBlur={onBlur}
          value={inputValue}
          type="text"
          isReadOnly={readOnly}
          focusBorderColor={readOnly ? "border" : undefined}
          {...rest}
        />

        {inputRightElement && <>{inputRightElement}</>}
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
      {!isEmpty(helperText) && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
