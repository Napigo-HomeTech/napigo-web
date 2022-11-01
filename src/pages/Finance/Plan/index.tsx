import React from "react";
import { Route, Routes } from "react-router-dom";
import { GridView } from "./GridView";

export const PlanPage: React.FC = () => {
    return (
        <Routes>
            <Route index element={<GridView />} />
        </Routes>
    );
};
