import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaArrowRight as MoveToIcon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/lib/Redux/store";
import { Category, PlanItem } from "@/types/finance.type";
import { uniqueId } from "lodash";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { useCategoryTable } from "./CategoryTableContext";

type MoveToCategorySelectProps = {
  categId: string;
};
export const MoveToCategorySelect: React.FC<MoveToCategorySelectProps> = ({
  categId,
}) => {
  const categories = useSelector(
    (state: RootState) => state.planformStore.categories
  );

  const { selectedItems, unCheckedAllItems } = useCategoryTable();

  const dispatch = useDispatch();

  /**
   * Moving all the item under this category to the
   * category by its categ_id update
   * @param categ
   */
  const onSelect = (categ: Category) => {
    const items = store.getState().planformStore.items as PlanItem[];

    const targetList = items.map((itemY: PlanItem) => {
      if (
        itemY.category_id === categId &&
        selectedItems.indexOf(itemY.item_id) >= 0
      ) {
        return {
          ...itemY,
          category_id: categ.categ_id,
        };
      }
      return itemY;
    });

    dispatch(PlanformActions.updatePlanItemsList(targetList));
    unCheckedAllItems();
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        colorScheme={"base"}
        rightIcon={<MoveToIcon />}
      >
        Move to
      </MenuButton>
      <MenuList maxHeight={"300px"} overflow="scroll">
        {categories?.map((item: Category) => (
          <MenuItem
            onClick={() => onSelect(item)}
            key={uniqueId()}
            fontSize="sm"
            paddingY="10px"
          >
            <Text color="text-hard">{item.name}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
