import { fixtures } from "@/constant/datasets/fixtures";
import { Card } from "@/elements";
import { RootState } from "@/lib/Redux/store";
import { Category } from "@/types/finance.type";
import { Heading, List, VStack } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { CategoryDatafieldController } from "./CategoryDatafield";

export const SummaryCard: React.FC = () => {
  const { categories, isReady } = useSelector((state: RootState) => {
    return {
      categories: state.planformStore.categories as Category[],
      isReady: state.planformStore.isReady,
    };
  });

  if (!isReady) {
    return null;
  }
  return <MemoizedSummaryCard categories={categories} />;
};

type MemoSummaryCardProps = {
  categories: Category[];
};
const MemoSummaryCard = ({ categories }: MemoSummaryCardProps) => {
  return (
    <Card>
      <VStack width="100%" alignItems={"flex-start"}>
        <Heading size="sm">
          {fixtures.financeStrings["finance.planform.summarycard.header"]}
        </Heading>
        <List width={"100%"}>
          {categories?.map((item: Category) => (
            <CategoryDatafieldController key={uniqueId()} {...item} />
          ))}
        </List>
      </VStack>
    </Card>
  );
};

const MemoizedSummaryCard = React.memo(MemoSummaryCard);
