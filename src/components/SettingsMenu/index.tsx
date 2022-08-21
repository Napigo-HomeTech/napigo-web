import { Divider, VStack } from "@chakra-ui/react";
import React from "react";
import { MenuItem } from "./MenuItem";
import {
  MdOutlineSettings as GeneralIcon,
  MdOutlineSecurity as AuthIcon,
} from "react-icons/md";

const iconSize = 20;

export const SettingsMenu: React.FC = () => {
  return (
    <VStack py="30px" px="20px">
      <MenuItem
        icon={<GeneralIcon size={iconSize} />}
        name="general"
        displayText="General"
        to="general"
      />

      <MenuItem
        icon={<AuthIcon size={iconSize} />}
        name="authentication"
        displayText="Authentication"
        to="authentication"
      />
      <Divider />
    </VStack>
  );
};
