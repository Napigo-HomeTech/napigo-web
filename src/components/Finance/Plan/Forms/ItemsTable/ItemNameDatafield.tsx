import { Form } from "@/elements";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import { PlanItem } from "@/types/finance.type";
import { FormControl } from "@chakra-ui/react";
import { find } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

type ItemNameDatafieldProps = {
  itemId: string;
};
export const ItemNameDatafield: React.FC<ItemNameDatafieldProps> = ({
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
    dispatch(PlanformActions.updatePlanItemNameDatafield({ itemId, value }));
  };

  const onBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(ev.target.value);
    ev.preventDefault();
  };

  const onKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      ev.currentTarget.blur();
    }
    return;
  };

  return (
    <MemoItemNameDatefield
      value={defaultPlanItem?.name as string}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
    />
  );
};

type MemoizedItemNameDatafieldProps = {
  value: string;
  onBlur: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
};
const MemoizedItemNameDatafield = ({
  value,
  onBlur,
  onKeyPress,
}: MemoizedItemNameDatafieldProps) => {
  return (
    <FormControl>
      <Form.TextField
        bg="card"
        placeholder="Name"
        defaultValue={value}
        onKeyDown={onKeyPress}
        onBlur={onBlur}
      />
    </FormControl>
  );
};

const compareItemNameDatafieldProps = (
  prev: MemoizedItemNameDatafieldProps,
  next: MemoizedItemNameDatafieldProps
) => {
  return prev.value === next.value;
};
const MemoItemNameDatefield = React.memo(
  MemoizedItemNameDatafield,
  compareItemNameDatafieldProps
);
