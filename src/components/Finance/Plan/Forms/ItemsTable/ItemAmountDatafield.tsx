import { Form } from "@/elements";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import { PlanItem } from "@/types/finance.type";
import { FormControl } from "@chakra-ui/react";
import { find } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type ItemAmountDatafieldProps = {
  itemId: string;
};
export const ItemAmountDatafield: React.FC<ItemAmountDatafieldProps> = ({
  itemId,
}) => {
  const dispatch = useDispatch();

  const defaultPlanItem: PlanItem | undefined = useSelector(
    (state: RootState) => {
      const listing = state.planformStore.items;
      return find(listing, { item_id: itemId });
    }
  );

  const onInputChange = (value: string) => {
    dispatch(PlanformActions.updatePlanItemAmountDatafield({ itemId, value }));
  };

  return (
    <MemoItemAmountDatefield
      value={defaultPlanItem?.amount as string}
      onInputChange={onInputChange}
    />
  );
};

type MemoizedItemAmountDatafieldProps = {
  value: string;
  onInputChange: (value: string) => void;
};
const MemoizedItemAmountDatafield = ({
  value,
  onInputChange,
}: MemoizedItemAmountDatafieldProps) => {
  return (
    <FormControl>
      <Form.CurrencyField
        bg="card"
        placeholder="Name"
        defaultValue={value}
        onInputChange={onInputChange}
      />
    </FormControl>
  );
};

const compareItemAmountDatafieldProps = (
  prev: MemoizedItemAmountDatafieldProps,
  next: MemoizedItemAmountDatafieldProps
) => {
  return prev.value === next.value;
};
const MemoItemAmountDatefield = React.memo(
  MemoizedItemAmountDatafield,
  compareItemAmountDatafieldProps
);
