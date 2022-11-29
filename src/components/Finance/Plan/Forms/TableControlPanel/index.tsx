import { RootState } from "@/lib/Redux/store";
import { HStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { AddCategoryForm } from "./AddCategoryForm";

export const TableControlPanel: React.FC = () => {
  const { isReady } = useSelector((state: RootState) => state.planformStore);

  if (!isReady) {
    return null;
  }
  return (
    <HStack width={"100%"}>
      <AddCategoryForm />
    </HStack>
  );
};
