import React, { useState } from "react";
import { Select, ChakraStylesConfig } from "chakra-react-select";
import { FormControl } from "@chakra-ui/react";

type Option = {
  label: string;
  value: string;
  color: string;
};
const statusOptions: Option[] = [
  {
    label: "DRAFT",
    value: "DRAFT",
    color: "gray.500",
  },
  {
    label: "IN-QUEUE",
    value: "IN-QUEUE",
    color: "secondary.500",
  },
];

export const PlanStatusSelect: React.FC = () => {
  const [selected, setSelected] = useState<Option | null>();

  const chakraStyles: ChakraStylesConfig = {
    singleValue: (provided, { data }) => {
      const { color } = data as Option;
      return {
        ...provided,
        paddingLeft: "20px",
        fontWeight: "semibold",
        color: "text-hard",
        _before: {
          content: `""`,
          position: "absolute",
          left: "0px",
          rounded: "full",
          width: "10px",
          height: "10px",
          top: "30%",
          bg: color,
        },
      };
    },
    valueContainer: (provided, _) => ({
      ...provided,
      background: "card",
      w: "inherit",
    }),
    container: (provided, _) => ({
      ...provided,
      background: "card",
      w: "inherit",
    }),
    menu: (provided, _) => ({
      ...provided,
      w: "100%",
    }),

    menuList: (provided, _) => ({
      ...provided,
      w: "100%",
    }),
    dropdownIndicator: (provided, _) => ({
      ...provided,
      p: 0,
      background: "card",
      w: "40px",
    }),
  };

  return (
    <FormControl minWidth={"250px"}>
      <Select
        chakraStyles={chakraStyles}
        selectedOptionStyle="check"
        defaultValue={statusOptions[0]}
        isReadOnly
        colorScheme="brand"
        size="md"
        placeholder="Status"
        options={statusOptions}
        value={selected}
        onChange={(value) => {
          setSelected(value as Option);
        }}
      />
    </FormControl>
  );
};
