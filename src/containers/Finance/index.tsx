import { fixtures } from "@/constant/datasets/fixtures";
import React from "react";
import { MdMonetizationOn, MdMoneyOff } from "react-icons/md";
import { Navigate, Route, Routes } from "react-router-dom";
import { ModulePage } from "../ModulePage";

const financeMenus = [
  {
    icon: <MdMonetizationOn />,
    name: "Banks",
    displayText: fixtures.financeStrings["finance.menu.bank.text"],
    goto: "",
  },
  {
    icon: <MdMoneyOff />,
    name: "Debt",
    displayText: fixtures.financeStrings["finance.menu.debt.text"],
    goto: "/user/settings/authentication",
  },
];

export const FinanceContainer: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <ModulePage
            menus={financeMenus}
            contentBackground="inherit"
            title="Finance"
          />
        }
      >
        <Route index element={<Navigate to="banks" />} />
        <Route path="banks" element={<div>Hello Banks</div>} />
      </Route>
    </Routes>
  );
};
