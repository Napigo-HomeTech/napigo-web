import React from "react";
import { Route, Routes } from "react-router-dom";
import { BudgetListingPage } from "./BudgetListing";

export const BudgetsPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<BudgetListingPage />} />
    </Routes>
  );
};
