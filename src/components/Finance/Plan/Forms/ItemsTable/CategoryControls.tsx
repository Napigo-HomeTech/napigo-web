import { Button, Checkbox, HStack } from "@chakra-ui/react";
import React, { ChangeEvent, useCallback } from "react";
import { useCategoryTable } from "./CategoryTableContext";

export const CategoryControls: React.FC = () => {
  const { selectedItems, checkedAllItems, unCheckedAllItems, checkedAll } =
    useCategoryTable();

  /**
   *
   */
  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const isChecked = ev.target.checked;
      if (isChecked) {
        checkedAllItems();
        return;
      }
      unCheckedAllItems();
    },
    [checkedAllItems, unCheckedAllItems]
  );
  return (
    <HStack marginRight="20px">
      {selectedItems.length > 0 && (
        <Button size="sm" colorScheme={"base"}>
          Move to{" "}
        </Button>
      )}
      <Checkbox
        colorScheme="brand"
        borderColor={"text-soft"}
        isChecked={checkedAll}
        onChange={onChange}
      />
    </HStack>
  );
};
