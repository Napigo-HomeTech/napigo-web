import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React, { useRef } from "react";
import { LabelColors } from "./LabelColors";

type ColorDropdownProps = {
  selected: string;
  onChange: (selected: string) => void;
};
export const ColorDropdown: React.FC<ColorDropdownProps> = ({
  selected,
  onChange,
}) => {
  const ScrollRef = useRef<HTMLDivElement>(null);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="card">
        <Box height="25px" width="25px" bg={selected} rounded={"full"} />
      </MenuButton>
      <MenuList
        display={"flex"}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={0}
      >
        <SimpleGrid
          ref={ScrollRef}
          columns={4}
          spacing={3}
          maxHeight="300px"
          overflow="scroll"
          paddingY={2}
        >
          {LabelColors.map((color: string) => (
            <MenuItem
              key={uniqueId()}
              as={Box}
              borderWidth={2}
              onClick={() => onChange(color)}
              borderColor="border"
              _hover={{
                bg: { color },
                borderWidth: 2,
                borderColor: "brand.500",
              }}
              _active={{
                bg: { color },
              }}
              _focus={{
                bg: { color },
              }}
              bg={color}
              height="40px"
              width="40px"
              rounded="full"
            />
          ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
};
