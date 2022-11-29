import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

type BadgeProps = {
  color: string;
  status: string;
};
export const Badge: React.FC<BadgeProps> = (props) => {
  const { color, status } = props;
  return (
    <HStack px="10px" py="3px" rounded="md">
      <Box width="10px" height="10px" rounded="full" bg={color} />
      <Text fontSize={"xs"} color={color} fontWeight="semibold">
        {status}
      </Text>
    </HStack>
  );
};
