import { Card, Form } from "@/elements";
import { actions } from "@/lib/Redux/plan-form-reducer";
import { RootState } from "@/lib/Redux/store";
import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  NumberInput,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import currency from "currency.js";
import { isNaN } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <ESMAmountDisplay />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <ASMPercentDisplay />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <ASMAmountDisplay />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <COLDisplay />
        </GridItem>
      </Grid>
    </Card>
  );
};

/**
 * --------------------------------------------------------------------------------
 * Income Input
 * --------------------------------------------------------------------------------
 */
export const IncomeInput: React.FC = () => {
  const dispatch = useDispatch();

  const { amount } = useSelector(
    (state: RootState) => state.plan_datafield_income
  );
  return (
    <Form.CurrencyField
      label="Net income"
      bg="card"
      placeholder="0.00"
      defaultValue={amount}
      onInputChange={(amount: string) => {
        dispatch(actions.updateIncomeDataField(amount));
      }}
    />
  );
};

/**
 * --------------------------------------------------------------------------------
 * ASM Input
 * --------------------------------------------------------------------------------
 */

export const ASMInput: React.FC = () => {
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

/**
 * --------------------------------------------------------------------------------
 * ESM Amount
 * --------------------------------------------------------------------------------
 */
export const ESMAmountDisplay: React.FC = () => {
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        ESM $
      </Heading>
      <Heading color="text-hard" size="sm">
        {currency(5230.0, { precision: 2 }).format()}
      </Heading>
    </VStack>
  );
};

/**
 * --------------------------------------------------------------------------------
 * ASM % Input
 * --------------------------------------------------------------------------------
 */
export const ASMPercentDisplay: React.FC = () => {
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        ASM %
      </Heading>
      <Heading color="text-hard" size="sm">
        0 %
      </Heading>
    </VStack>
  );
};

/**
 * --------------------------------------------------------------------------------
 * ASM Amount Input
 * --------------------------------------------------------------------------------
 */
export const ASMAmountDisplay: React.FC = () => {
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        ASM $
      </Heading>
      <Heading color="text-hard" size="sm">
        {currency("2234.230", { precision: 2 }).format()}
      </Heading>
    </VStack>
  );
};

/**
 * --------------------------------------------------------------------------------
 * COL Input
 * --------------------------------------------------------------------------------
 */
export const COLDisplay: React.FC = () => {
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        COL $
      </Heading>
      <Heading color="text-hard" size="sm">
        {currency(5230.0, { precision: 2 }).format()}
      </Heading>
    </VStack>
  );
};
