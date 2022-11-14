import { PlanTitleEditable } from "@/components/Finance/Plan/Forms/PlanTitleEditable";
import { HStack, VStack } from "@chakra-ui/react";
import React from "react";

export const PlanForm: React.FC = () => {
  return (
    <VStack width={"100%"} gap={2} p="20px">
      <HStack width={"inherit"} justifyContent={"space-between"}>
        <PlanTitleEditable
          defaultValue="Hello world"
          onInputChange={(_: string) => {
            /** @todo */
          }}
        />
        <HStack></HStack>
      </HStack>
    </VStack>
  );
};
