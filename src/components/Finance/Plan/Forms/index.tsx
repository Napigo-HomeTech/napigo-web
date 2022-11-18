import { HStack, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { PlanFormLoader } from "./PlanFormLoader";
import { PlanFormUpdater } from "./PlanFormUpdater";
import { PlanTitle } from "./PlanTitle";
import { SavingIndicator } from "./SavingIndicator";

export const PlanForm: React.FC = () => {
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
