import { fixtures } from "@/constant/datasets/fixtures";
import { Button, HStack } from "@chakra-ui/react";
import React from "react";

export const TableControlPanel: React.FC = () => {
  return (
    <HStack width={"100%"}>
      <Button variant={"outline"} colorScheme="brand">
        {fixtures.financeStrings["finance.planform.new-category.buttontext"]}
      </Button>
    </HStack>
  );
};
