import { Accordion } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { Category } from "@/types/finance.type";
import { CategorySection } from "./CategorySection";
import { uniqueId } from "lodash";
import { CategoryTableContextProvider } from "./CategoryTableContext";
export const ItemsTable: React.FC = () => {
  const categories: Category[] | undefined = useSelector(
    (state: RootState) => state.planformStore.categories
  );

  if (categories) {
    return <AccordionsItemTable categories={categories} />;
  }
  return null;
};

type ItemsTableProps = {
  categories: Category[];
};
const MemoizedAccordionsItemTable = ({ categories }: ItemsTableProps) => {
  return (
    <Accordion allowMultiple width={"100%"} paddingRight="20px">
      {categories?.map((item: Category) => (
        <CategoryTableContextProvider key={uniqueId()} category={item}>
          <CategorySection key={uniqueId()} {...item} />
        </CategoryTableContextProvider>
      ))}
    </Accordion>
  );
};

const AccordionsItemTable = React.memo(MemoizedAccordionsItemTable);
