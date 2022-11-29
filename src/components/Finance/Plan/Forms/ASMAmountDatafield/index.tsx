import { fixtures } from "@/constant/datasets/fixtures";
import { calculateASM } from "@/lib/Finance/utils";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import { VStack, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ASMAmountDatafield: React.FC = () => {
  const dispatch = useDispatch();
  const { asm_amount, net_income, col } = useSelector(
    (state: RootState) => state.planformStore
  );

  useEffect(() => {
    const asm = calculateASM(net_income as string, col as string);
    dispatch(PlanformActions.updateASMAmount(asm));
  }, [col, dispatch, net_income]);

  return <MemoASMAmount asmAmount={asm_amount as string} />;
};

type MemoASMAmountDatafieldProps = {
  asmAmount: string;
};
const MemoASMAmountDatafield = ({ asmAmount }: MemoASMAmountDatafieldProps) => {
  return (
    <VStack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Heading color="text-soft" size={"xs"} fontWeight="bold">
        {
          fixtures.financeStrings[
            "finance.planform.tableform.mainsection.asm-amount.headertext"
          ]
        }
      </Heading>
      <Heading color="text-hard" size="sm">
        {asmAmount}
      </Heading>
    </VStack>
  );
};

const MemoASMAmount = React.memo(MemoASMAmountDatafield);
