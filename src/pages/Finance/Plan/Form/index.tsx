import { PlanFormContainer } from "@/components/Finance/Plan/Forms";
import { VStack } from "@chakra-ui/react";
import React from "react";

export const PlanFormPage: React.FC = () => {
  return (
    <VStack width={"100%"} height="100%" gap={2} p="20px">
      <PlanFormContainer />
    </VStack>
  );
};
