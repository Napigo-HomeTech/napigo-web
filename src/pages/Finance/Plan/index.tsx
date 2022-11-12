import React from "react";
import { Route, Routes } from "react-router-dom";
import { PlanDashboard } from "./Dashboard";
import { PlanForm } from "./Form";

export const PlanPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<PlanDashboard />} />
      <Route path=":plan_id" element={<PlanForm />} />
    </Routes>
  );
};
