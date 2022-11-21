import { usePrompt } from "@/elements/Prompt";
import { RootState } from "@/lib/Redux/store";
import { HStack, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { PlanTitle } from "./PlanTitle";
import { SavingIndicator } from "./SavingIndicator";
import { MainSection } from "./MainSection";
import { PlanformManager } from "./PlanformManager";
import { TopRightControl } from "./TopRightControl";

export const PlanForm: React.FC = () => {
  const { eventCounts, onSaving } = useSelector(
    (state: RootState) => state.planformStore
  );

  usePrompt({
    header: "Are you sure you want to leave ?",
    message: "Changes that you made may not be saved",
    when: eventCounts > 0 || onSaving,
  });

  return (
    <Fragment>
      <PlanformManager />
      <VStack width={"inherit"} gap={2}>
        <HStack
          width={"inherit"}
          gap={0}
          justifyContent={"space-between"}
          maxHeight={"70px"}
        >
          <HStack>
            <PlanTitle />
            <SavingIndicator />
          </HStack>
          <TopRightControl />
        </HStack>
        <MainSection />
      </VStack>
    </Fragment>
  );
};
