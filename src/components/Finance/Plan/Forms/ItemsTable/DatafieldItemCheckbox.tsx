import { Checkbox } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import { useCategoryTable } from "./CategoryTableContext";

type DatafieldItemCheckboxProps = {
  itemId: string;
};
/**
 *
 * @returns
 */
export const DatafieldItemCheckbox: React.FC<DatafieldItemCheckboxProps> = ({
  itemId,
}) => {
  const { checkedItem, uncheckedItem, selectedItems } = useCategoryTable();

  const isChecked = useMemo(() => {
    const t = selectedItems.indexOf(itemId);
    return t >= 0;
  }, [selectedItems, itemId]);

  /**
   *
   */
  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const isChecked = ev.target.checked;

      isChecked ? checkedItem(itemId) : uncheckedItem(itemId);
    },
    [checkedItem, itemId, uncheckedItem]
  );

  return (
    <Checkbox
      borderColor={"text-soft"}
      colorScheme={"brand"}
      isChecked={isChecked}
      onChange={onChange}
    />
  );
};
