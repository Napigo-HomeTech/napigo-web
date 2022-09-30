import { VStack } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";
import { MenuItem, MenuItemProps } from "./MenuItem";

export type MenuItem = {
  /**
   * the icon element for the item
   */
  icon: React.ReactElement;
  /**
   * Name which is going to be use and identifier for
   * active element matching...using this value to do .includes()
   * against the location.pathname for determine active state
   */
  name: string;
  /**
   * The actual text to be display in the item
   */
  displayText: string;
  /**
   * Location path , where to go when user click on the item
   */
  to: string;
};

type VerticalMenuProps = {
  menus: MenuItemProps[];
};
export const VerticalMenu: React.FC<VerticalMenuProps> = ({ menus }) => {
  return (
    <VStack py="30px" px="20px">
      {menus.map((item: MenuItemProps) => (
        <MenuItem key={uniqueId()} {...item} />
      ))}
    </VStack>
  );
};
