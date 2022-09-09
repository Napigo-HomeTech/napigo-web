import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

type HorizontalMenuLayoutProps = {
  menu: React.ReactElement;
  contentBackground: string;
  /**
   * For additional Component to be added at the top of the Menu
   */
  menuTopExtras?: React.ReactElement;
};
export const VerticalMenuLayout: React.FC<HorizontalMenuLayoutProps> = (
  props
) => {
  const { menu, contentBackground, menuTopExtras } = props;

  return (
    <HStack
      gap={2}
      alignItems="start"
      position="sticky"
      w="100vw"
      bg={contentBackground}
    >
      <Box width="300px" top={"70px"} left={0} position="sticky" height="auto">
        {menuTopExtras && <>{menuTopExtras}</>}
        {menu}
      </Box>
      <Box flex={1}>
        <Outlet />
      </Box>
    </HStack>
  );
};
