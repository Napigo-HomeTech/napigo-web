import React, { useEffect } from "react";
import { RootState } from "@/lib/Redux/store";
import { VStack, Heading } from "@chakra-ui/react";
import currency from "currency.js";
import { useDispatch, useSelector } from "react-redux";
import { fixtures } from "@/constant/datasets/fixtures";
import { calculateCOL } from "@/lib/Finance/utils";
import { PlanItem } from "@/types/finance.type";
import { PlanformActions } from "@/lib/Redux/planform.reducer";

export const COLDatafield: React.FC = () => {
  const dispatch = useDispatch();
  const { col, items } = useSelector((state: RootState) => state.planformStore);

  useEffect(() => {
    const newCol = calculateCOL(items as PlanItem[]);
    dispatch(PlanformActions.updateCOL(newCol));
  }, [col, items, dispatch]);

  return <MemoizedCOL col={col as string} />;
};

type MemoCOLDatafieldProps = {
  col: string;
};
const MemoCOLDatafield = ({ col }: MemoCOLDatafieldProps) => {
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        {
          fixtures.financeStrings[
            "finance.planform.tableform.mainsection.col.headertext"
          ]
        }
      </Heading>
      <Heading color="text-hard" size="sm">
        {currency(col as string, { precision: 2 }).format()}
      </Heading>
    </VStack>
  );
};

const MemoizedCOL = React.memo(MemoCOLDatafield);
