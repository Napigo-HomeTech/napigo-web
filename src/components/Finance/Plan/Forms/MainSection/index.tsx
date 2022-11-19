import { Card, Form } from "@/elements";
import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  NumberInput,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { isNaN } from "lodash";
import React, { useState } from "react";

export const MainSection: React.FC = () => {
  return (
    <Card width={"100%"} padding={0}>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(8, 1fr)">
        <GridItem
          colSpan={4}
          borderLeftWidth={1}
          borderLeftColor="transparent"
          padding={"20px"}
          display="flex"
          alignItems={"center"}
          flexDirection="row"
          gap={4}
        >
          <IncomeInput />
          <ASMInput />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border" />
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border" />
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border" />
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border" />
      </Grid>
    </Card>
  );
};

/**
 * --------------------------------------------------------------------------------
 * Income Input
 * --------------------------------------------------------------------------------
 */
const IncomeInput: React.FC = () => {
  return (
    <Form.CurrencyField
      label="Net income"
      bg="card"
      placeholder="0.00"
      defaultValue={"0.00"}
    />
  );
};

/**
 * --------------------------------------------------------------------------------
 * ASM Input
 * --------------------------------------------------------------------------------
 */

const ASMInput: React.FC = () => {
  const [value, setValue] = useState<number | string>(0);

  return (
    <FormControl>
      <FormLabel>ESM %</FormLabel>
      <HStack gap={0}>
        <NumberInput>
          <Form.TextField
            bg="card"
            maxW="70px"
            mr="2rem"
            type="number"
            value={value}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              const num = Number.parseInt(ev.target.value);
              if (isNaN(num)) {
                setValue("");
                return;
              }
              setValue(num);
            }}
          />
        </NumberInput>

        <Slider
          flex="1"
          focusThumbOnChange={false}
          value={isNaN(value) ? 0 : (value as number)}
          colorScheme="brand"
          onChange={(val: number) => setValue(val)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            fontSize="sm"
            boxSize="32px"
            children={isNaN(value) || value === "" ? 0 : value}
          />
        </Slider>
      </HStack>
    </FormControl>
  );
};
