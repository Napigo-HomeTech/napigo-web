import { fixtures } from "@/constant/datasets/fixtures";
import { calculateASMPercent } from "@/lib/Finance/utils";
import { PlanformActions } from "@/lib/Redux/planform.reducer";
import { RootState } from "@/lib/Redux/store";
import { ASMHealthStatus } from "@/types/finance.type";
import { VStack, Heading } from "@chakra-ui/react";
import { isFinite, isNaN } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const ASMPercentDatafield: React.FC = () => {
  const dispatch = useDispatch();

  const { asm_percent, esm_amount, esm_percent, asm_amount } = useSelector(
    (state: RootState) => state.planformStore
  );

  useEffect(() => {
    const asmPercent = calculateASMPercent(
      esm_amount as string,
      asm_amount as string
    );
    let result = 0;

    if (!isNaN(asmPercent) && isFinite(asmPercent)) {
      result = asmPercent;
    }
    dispatch(PlanformActions.updateASM(result));
  }, [dispatch, esm_amount, asm_amount]);

  useEffect(() => {
    let asm: ASMHealthStatus = "NONE";
    if (esm_percent === 0) {
      asm = "NONE";
    } else if (asm_percent) {
      switch (true) {
        case asm_percent >= 75:
          asm = "HEALTHY";
          break;
        case asm_percent < 75 && asm_percent >= 50:
          asm = "WARNING";
          break;
        case asm_percent < 50:
          asm = "DANGER";
          break;
        default:
          asm = "NONE";
      }
    }

    dispatch(PlanformActions.updateHealthStatus(asm));
  }, [asm_percent, esm_percent, dispatch]);

  const HealthStatusColorContext = useMemo(() => {
    if (esm_percent === 0) {
      return "card";
    }
    switch (true) {
      case asm_percent! >= 75:
        return "success";
      case asm_percent! < 75 && asm_percent! >= 50:
        return "warning";
      case asm_percent! < 50:
        return "danger";
      default:
        return "card";
    }
  }, [asm_percent, esm_percent]);

  return (
    <MemoizedASMPercent
      asmPercent={asm_percent as number}
      healthStatusColor={HealthStatusColorContext}
    />
  );
};

type MemoASMPercentProps = {
  asmPercent: number;
  healthStatusColor: string;
};
const MemoASMPercent = ({
  asmPercent,
  healthStatusColor,
}: MemoASMPercentProps) => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      height="100%"
      gap={3}
      bg={healthStatusColor}
    >
      <Heading
        color={healthStatusColor === "card" ? "text-soft" : "card"}
        size={"xs"}
        fontWeight="bold"
      >
        {
          fixtures.financeStrings[
            "finance.planform.tableform.mainsection.asm-percent.headertext"
          ]
        }
      </Heading>
      <Heading
        color={healthStatusColor === "card" ? "text-hard" : "card"}
        size="sm"
      >
        {isNaN(asmPercent) ? "0" : asmPercent} %
      </Heading>
    </VStack>
  );
};

const MemoizedASMPercent = React.memo(MemoASMPercent);
