import { Accordion } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { Category } from "@/types/finance.type";
import { CategorySection } from "./CategorySection";
import { uniqueId } from "lodash";

export const ItemsTable: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.planformStore);

  return (
    <Accordion allowMultiple width={"100%"} paddingRight="20px">
      {categories?.map((item: Category) => (
        <CategorySection key={uniqueId()} {...item} />
      ))}
    </Accordion>
  );
};
