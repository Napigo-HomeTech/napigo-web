import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type HorizontalMenuLayoutProps = {
  menu: React.ReactElement;
  contentBackground: string;
};
export const VerticalMenuLayout: React.FC<HorizontalMenuLayoutProps> = (
  props
) => {
  const { menu, contentBackground } = props;

  return (
    <HStack
      gap={2}
      alignItems="start"
      position="sticky"
      w="100vw"
      bg={contentBackground}
    >
      <Box width="300px" top={"70px"} left={0} position="sticky" height="auto">
        {menu}
      </Box>
      <Box flex={1}>
        <Outlet />
      </Box>
    </HStack>
  );
};
