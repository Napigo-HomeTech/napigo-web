import { HStack, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export const SavingIndicator: React.FC = () => {
  return (
    <HStack
      width="auto"
      bg="brand.50"
      color="brand.500"
      gap={2}
      paddingX={"10px"}
      paddingY={"2px"}
      rounded="md"
    >
      <Spinner size="xs" />
      <Text fontSize="14px">Saving</Text>
    </HStack>
  );
};
