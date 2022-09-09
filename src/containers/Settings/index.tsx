import React from "react";
import { VerticalMenuLayout } from "@/layouts/VerticalMenuLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { SettingGeneralPage } from "@/pages/Settings/General";
import { SettingAuthenticationPage } from "@/pages/Settings/Authentication";
import { VerticalMenu } from "@/elements";
import {
  MdOutlineSettings as GeneralIcon,
  MdOutlineSecurity as AuthIcon,
} from "react-icons/md";
import { getMessage } from "@/constant/datasets/fixtures";

const ICON_SIZE = 20;

/**
 * Listing of Menu Mapping Object for Settings
 */
const SETTINGS_MENUS = [
  {
    icon: <GeneralIcon size={ICON_SIZE} />,
    name: "general",
    displayText: getMessage(
      "settingsStrings",
      "settings-menu.general.buttontext"
    ),
    to: "general",
  },
  {
    icon: <AuthIcon size={ICON_SIZE} />,
    name: "authentication",
    displayText: getMessage(
      "settingsStrings",
      "settings-menu.authentication.buttontext"
    ),
    to: "authentication",
  },
];

export const SettingsContainer: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <VerticalMenuLayout
            menu={<VerticalMenu menus={SETTINGS_MENUS} />}
            contentBackground="inherit"
          />
        }
      >
        <Route index element={<Navigate to="general" />} />
        <Route path="general" element={<SettingGeneralPage />} />
        <Route path="authentication" element={<SettingAuthenticationPage />} />
      </Route>
    </Routes>
  );
};
