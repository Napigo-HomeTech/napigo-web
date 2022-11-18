import { usePrompt } from "@/elements/Prompt";
import { RootState } from "@/lib/Redux/store";
import { HStack, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { PlanFormLoader } from "./PlanFormLoader";
import { PlanFormUpdater } from "./PlanFormUpdater";
import { PlanTitle } from "./PlanTitle";
import { SavingIndicator } from "./SavingIndicator";

export const PlanForm: React.FC = () => {
  const { count, onSaving } = useSelector((state: RootState) => ({
    count: state.plan_eventCountStore.count,
    onSaving: state.plan_onSavingStore.onSaving,
  }));

  usePrompt({
    header: "Are you sure you want to leave ?",
    message: "Changes that you made may not be saved",
    when: count > 0 || onSaving,
  });

  return (
    <Fragment>
      <PlanFormLoader />
      <PlanFormUpdater />
      <VStack width={"inherit"}>
        <HStack width={"inherit"} gap={0} justifyContent={"flex-start"}>
          <PlanTitle />
          <SavingIndicator />
          <HStack></HStack>
        </HStack>
      </VStack>
    </Fragment>
  );
};
