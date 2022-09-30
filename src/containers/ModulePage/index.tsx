import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";

export type MenuItem = {
  /**
   * Supply the icon as React Element which you want to display for this item
   * you may include styling to the icon too, if not will use default styling
   */
  icon: React.ReactElement;
  /**
   * This is the key identifier for each item, which used to indicate
   * active item
   */
  name: string;
  /**
   * The text to display in the Item Box
   */
  displayText: string;
  /**
   * Link when user click on the item, Each item use
   * RouterLink
   */
  goto: string;
};
type ModulePageProps = {
  menus: MenuItem[];
  /**
   * Provide your your background if required, will override
   * the default which "inherit". Do take note that you have to create your
   * own logic call before sending the value here for dark mode | light toggle
   */
  contentBackground?: string;
  /**
   * The text that will be display in the page title section,
   * on top of the left drawer menu
   */
  title?: string;
};

export const ModulePage: React.FC<ModulePageProps> = (props) => {
  const { menus, contentBackground, title } = props;
  return (
    <HStack
      gap={2}
      alignItems="start"
      position="sticky"
      w="100vw"
      bg={contentBackground}
    >
      <Box width="300px" top="70px" left={0} position="sticky" height="auto">
        {title && (
          <VStack
            width="full"
            p="20px"
            paddingBottom={0}
            margin={0}
            alignItems="flex-start"
            justifyContent="start"
          >
            <Heading size="md" fontWeight="black">
              {title}
            </Heading>
            <Divider />
          </VStack>
        )}
        <VStack py="30px" px="20px">
          {menus.map((item: MenuItem) => (
            <Menu {...item} key={uniqueId()} />
          ))}
        </VStack>
      </Box>
      <Box flex={1}>
        <Outlet />
      </Box>
    </HStack>
  );
};
