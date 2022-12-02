import { RootState } from "@/lib/Redux/store";
import { Category, PlanItem } from "@/types/finance.type";
import React, { PropsWithChildren, useContext, useState } from "react";
import { useSelector } from "react-redux";

type CategoryTableContextProps = {
  selectedItems: string[];
  checkedAllItems: () => void;
  unCheckedAllItems: () => void;
  checkedItem: (itemId: string) => void;
  uncheckedItem: (itemId: string) => void;
  checkedAll: boolean;
  setCheckedAll: (s: boolean) => void;
};
const CategoryTableContext = React.createContext<CategoryTableContextProps>({
  selectedItems: [],
  checkedAllItems: () => {
    /**
     * Empty function
     */
  },
  unCheckedAllItems: () => {
    /**
     * Empty function
     */
  },
  checkedItem: (_) => {
    /**
     * Empty function
     */
  },
  uncheckedItem: (_) => {
    /**
     * Empty function
     */
  },
  checkedAll: false,
  setCheckedAll: () => {
    /**
     * Empty function
     */
  },
});

/**
 *
 * @returns
 */
export const useCategoryTable = () => {
  return useContext(CategoryTableContext);
};

interface CategoryTableContextProviderProps extends PropsWithChildren {
  category: Category;
}
/**
 *
 * @param props
 * @returns
 */
export const CategoryTableContextProvider = (
  props: CategoryTableContextProviderProps
) => {
  const { children, category } = props;
  /**
   * Will only store itemIds as string to keep track of checkes status
   * instead of entire object
   */
  const [selectedItems, setSelectItems] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  const listing = useSelector((state: RootState) => {
    const { items } = state.planformStore;
    return items
      ?.filter((item: PlanItem) => item.category_id === category.categ_id)
      .map((item: PlanItem) => item.item_id);
  });

  const checkedAllItems = () => {
    setSelectItems(listing as string[]);
    setCheckedAll(true);
  };

  const unCheckedAllItems = () => {
    setSelectItems([]);
    setCheckedAll(false);
  };

  const checkedItem = (itemId: string) => {
    selectedItems.push(itemId);
    setSelectItems([...selectedItems]);
    setCheckedAll(listing?.length === [...selectedItems].length);
  };

  const uncheckedItem = (itemId: string) => {
    const idx = selectedItems.indexOf(itemId);
    selectedItems.splice(idx, 1);
    setSelectItems([...selectedItems]);
    setCheckedAll(listing?.length === [...selectedItems].length);
  };

  return (
    <CategoryTableContext.Provider
      value={{
        selectedItems,
        checkedAllItems,
        unCheckedAllItems,
        checkedItem,
        uncheckedItem,
        checkedAll,
        setCheckedAll,
      }}
    >
      {children}
    </CategoryTableContext.Provider>
  );
};
