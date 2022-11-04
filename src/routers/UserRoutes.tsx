import { AppUserContext } from "@/containers/App/AppUserContext";
import { UserLayout } from "@/layouts/UserLayout";
import { SettingsContainer } from "@/containers/Settings";
import { ProfileContainer } from "@/containers/Profile";
import { ConsolePage } from "@/pages/Console";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FinanceContainer } from "@/containers/Finance";

export const UserRoutes: React.FC = () => {
    return (
        <AppUserContext>
            <Routes>
                <Route path="user">
                    <Route element={<UserLayout />}>
                        <Route index element={<Navigate to="console" />} />
                        <Route path="console/*" element={<ConsolePage />} />
                        <Route
                            path="settings/*"
                            element={<SettingsContainer />}
                        />
                        <Route
                            path="profile/*"
                            element={<ProfileContainer />}
                        />
                        <Route
                            path="finance/*"
                            element={<FinanceContainer />}
                        />
                    </Route>
                </Route>
                <Route path="/" element={<Navigate to="user" />} />
                <Route path="*" element={<Navigate to="user" />} />
            </Routes>
        </AppUserContext>
    );
};
