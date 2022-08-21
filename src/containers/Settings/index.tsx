import React from "react";
import { VerticalMenuLayout } from "@/layouts/VerticalMenuLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { SettingsMenu } from "@/components/SettingsMenu";
import { SettingGeneralPage } from "@/pages/Settings/General";
import { SettingAuthenticationPage } from "@/pages/Settings/Authentication";

export const SettingsContainer: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <VerticalMenuLayout
            menu={<SettingsMenu />}
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
