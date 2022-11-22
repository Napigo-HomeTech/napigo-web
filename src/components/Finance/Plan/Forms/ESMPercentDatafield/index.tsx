import { Form } from "@/elements";
import { calculateESMAmount } from "@/lib/Finance/utils";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import {
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { isNaN } from "lodash";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ESMPercentDatafield: React.FC = () => {
  const dispatch = useDispatch();

  const { esm_percent, net_income } = useSelector(
    (state: RootState) => state.planformStore
  );

  const [value, setValue] = useState<number | string>(esm_percent as number);

  const updateEsmPercentAndAmount = useCallback(() => {
    const val = value === "" ? 0 : (value as number);
    dispatch(PlanformActions.updateESM(val));
    /**
     * Update the ESM Amount too
     */
    const esmValue = calculateESMAmount(
      net_income as string,
      esm_percent as number
    );
    dispatch(PlanformActions.updateESMAmount(esmValue));
  }, [dispatch, esm_percent, net_income, value]);

  const onBlur = (_: React.FocusEvent<HTMLInputElement>) => {
    updateEsmPercentAndAmount();
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      ev.currentTarget.blur();
    }
  };

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
            onKeyDown={onKeyDown}
            onBlur={onBlur}
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
          onChangeEnd={(_) => {
            updateEsmPercentAndAmount();
          }}
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
