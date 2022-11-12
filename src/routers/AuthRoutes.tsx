import { AuthLayout } from "@/layouts/AuthLayout";
import { RegisterPage, SigninPage } from "@/pages/Auth";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export const AuthRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<SigninPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<Navigate to="auth" />} />
        <Route path="*" element={<Navigate to="auth" />} />
      </Routes>
    </>
  );
};
