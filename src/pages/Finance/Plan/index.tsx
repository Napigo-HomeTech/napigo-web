import React from "react";
import { Route, Routes } from "react-router-dom";
import { PlanDashboard } from "./Dashboard";

export const PlanPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<PlanDashboard />} />
    </Routes>
  );
};
