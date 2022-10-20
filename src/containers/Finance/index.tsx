import { fixtures } from "@/constant/datasets/fixtures";
import { AccountsPage } from "@/pages/Finance/Accounts";
import React from "react";
import {
    FaDollarSign as BudgetIcon,
    FaCoins as AccountIcon,
    FaChartLine as ReportIcon,
    FaCopy as TemplateIcon,
    FaSlidersH as SettingIcon,
} from "react-icons/fa";
import { Navigate, Route, Routes } from "react-router-dom";
import { ModulePage } from "../ModulePage";

const financeMenus = [
    {
        icon: <AccountIcon />,
        name: "accounts",
        displayText: fixtures.financeStrings["finance.menu.accounts.text"],
        goto: "",
    },
    {
        icon: <BudgetIcon />,
        name: "budget",
        displayText: fixtures.financeStrings["finance.menu.budget.text"],
        goto: "budgeting",
    },
    {
        icon: <ReportIcon />,
        name: "report",
        displayText: fixtures.financeStrings["finance.menu.report.text"],
        goto: "report",
    },
    {
        icon: <TemplateIcon />,
        name: "template",
        displayText: fixtures.financeStrings["finance.menu.template.text"],
        goto: "template",
    },
    {
        icon: <SettingIcon />,
        name: "settings",
        displayText: fixtures.financeStrings["finance.menu.settings.text"],
        goto: "settings",
    },
];

export const FinanceContainer: React.FC = () => {
    return (
        <Routes>
            <Route element={<ModulePage menus={financeMenus} contentBackground="inherit" title="Finance" />}>
                <Route index element={<Navigate to="accounts" />} />
                <Route path="accounts" element={<AccountsPage />} />
                <Route path="budgeting" element={<div>Budgeting</div>} />
                <Route path="report" element={<div>Report</div>} />
                <Route path="template" element={<div>Template</div>} />
                <Route path="settings" element={<div>Settings</div>} />
            </Route>
        </Routes>
    );
};
