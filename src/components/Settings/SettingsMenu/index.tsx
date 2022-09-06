import { Divider, VStack } from "@chakra-ui/react";
import React from "react";
import { MenuItem } from "./MenuItem";
import {
  MdOutlineSettings as GeneralIcon,
  MdOutlineSecurity as AuthIcon,
} from "react-icons/md";
import { getMessage } from "@/constant/datasets/fixtures";

const iconSize = 20;

export const SettingsMenu: React.FC = () => {
  return (
    <VStack py="30px" px="20px">
      <MenuItem
        icon={<GeneralIcon size={iconSize} />}
        name="general"
        displayText={getMessage(
          "settingsStrings",
          "settings-menu.general.buttontext"
        )}
        to="general"
      />

      <MenuItem
        icon={<AuthIcon size={iconSize} />}
        name="authentication"
        displayText={getMessage(
          "settingsStrings",
          "settings-menu.authentication.buttontext"
        )}
        to="authentication"
      />
      <Divider />
    </VStack>
  );
};
