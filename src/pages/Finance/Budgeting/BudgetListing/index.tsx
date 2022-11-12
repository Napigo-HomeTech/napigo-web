import { BudgetsList } from "@/components/Finance/Budgets/BudgetsList";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";

export const BudgetListingPage: React.FC = () => {
  return (
    <VStack gap={4} flexDirection="column" p={"20px"} width="100%">
      <Box width="100%" height="100px" borderWidth={1} rounded={"md"} />
      <BudgetsList />
    </VStack>
  );
};
