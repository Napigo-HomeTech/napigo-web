import { ConfirmEmail } from "@/pages/Auth";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export const PreAuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="pre-auth">
        <Route index element={<Navigate to="confirm-email" />} />
        <Route path="confirm-email" element={<ConfirmEmail />} />
      </Route>
      <Route path="*" element={<Navigate to="/pre-auth/confirm-email" />} />
    </Routes>
  );
};
