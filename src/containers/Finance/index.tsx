import { fixtures } from "@/constant/datasets/fixtures";
import { AccountsPage } from "@/pages/Finance/Accounts";
import { BudgetsPage } from "@/pages/Finance/Budgeting";
import React from "react";
import {
    FaDollarSign as BudgetIcon,
    FaCoins as AccountIcon,
    FaChartLine as ReportIcon,
    FaTelegramPlane as PlanIcon,
    FaSlidersH as SettingIcon,
} from "react-icons/fa";
import { BiAddToQueue as QueueIcon, BiTargetLock as GoalTargetIcon } from "react-icons/bi";
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
        icon: <PlanIcon />,
        name: "plan",
        displayText: fixtures.financeStrings["finance.menu.plan.text"],
        goto: "plan",
    },
    {
        icon: <QueueIcon />,
        name: "queue",
        displayText: fixtures.financeStrings["finance.menu.queue.text"],
        goto: "queue",
    },
    {
        icon: <GoalTargetIcon />,
        name: "goal-target",
        displayText: fixtures.financeStrings["finance.menu.goal-target.text"],
        goto: "goal-target",
    },
    {
        icon: <ReportIcon />,
        name: "report",
        displayText: fixtures.financeStrings["finance.menu.report.text"],
        goto: "report",
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
                <Route path="budgeting" element={<BudgetsPage />} />
                <Route path="plan" element={<div>Plan</div>} />
                <Route path="queue" element={<div>Queue</div>} />
                <Route path="goal-target" element={<div>Goals & Target</div>} />
                <Route path="report" element={<div>Report</div>} />
                <Route path="settings" element={<div>Settings</div>} />
            </Route>
        </Routes>
    );
};
