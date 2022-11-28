import { fixtures } from "@/constant/datasets/fixtures";
import { RootState } from "@/lib/Redux/store";
import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

export const TableControlPanel: React.FC = () => {
  const { isReady } = useSelector((state: RootState) => state.planformStore);

  if (!isReady) {
    return null;
  }
  return (
    <HStack width={"100%"}>
      <Button variant={"outline"} colorScheme="brand">
        {fixtures.financeStrings["finance.planform.new-category.buttontext"]}
      </Button>
    </HStack>
  );
};
