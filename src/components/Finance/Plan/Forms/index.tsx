import { HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { PlanTitleEditable } from "./PlanTitleEditable";
import { SavingIndicator } from "./SavingIndicator";

export const PlanForm: React.FC = () => {
  return (
    <VStack width={"inherit"}>
      <HStack width={"inherit"} gap={0} justifyContent={"flex-start"}>
        <PlanTitleEditable
          defaultValue="Hello world"
          onInputChange={(_: string) => {
            /** @todo */
          }}
        />
        <SavingIndicator />
        <HStack></HStack>
      </HStack>
    </VStack>
  );
};
