import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SettingGeneralPage } from "@/pages/Settings/General";
import { SettingAuthenticationPage } from "@/pages/Settings/Authentication";
import {
  MdOutlineSettings as GeneralIcon,
  MdOutlineSecurity as AuthIcon,
} from "react-icons/md";
import { fixtures } from "@/constant/datasets/fixtures";
import { ModulePage } from "../ModulePage";

const settingMenus = [
  {
    icon: <GeneralIcon />,
    name: "general",
    displayText: fixtures.settingsStrings["settings-menu.general.buttontext"],
    goto: "general",
  },
  {
    icon: <AuthIcon />,
    name: "authentication",
    displayText:
      fixtures.settingsStrings["settings-menu.authentication.buttontext"],
    goto: "authentication",
  },
];

export const SettingsContainer: React.FC = () => {
  return (
    <Routes>
      <Route element={<ModulePage menus={settingMenus} title="Settings" />}>
        <Route index element={<Navigate to="general" />} />
        <Route path="general" element={<SettingGeneralPage />} />
        <Route path="authentication" element={<SettingAuthenticationPage />} />
      </Route>
    </Routes>
  );
};
