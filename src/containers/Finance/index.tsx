import { fixtures } from "@/constant/datasets/fixtures";
import { VerticalMenu } from "@/elements";
import { VerticalMenuLayout } from "@/layouts/VerticalMenuLayout";
import { Heading, HStack } from "@chakra-ui/react";
import React from "react";
import { MdMonetizationOn, MdMoneyOff } from "react-icons/md";
import { Navigate, Route, Routes } from "react-router-dom";

const ICON_SIZE = 20;

const FINANCE_MENUS = [
  {
    icon: <MdMonetizationOn size={ICON_SIZE} />,
    name: "Banks",
    displayText: fixtures.financeStrings["finance.menu.bank.text"],
    to: "",
  },
  {
    icon: <MdMoneyOff size={ICON_SIZE} />,
    name: "Debt",
    displayText: fixtures.financeStrings["finance.menu.debt.text"],
    to: "/user/settings/authentication",
  },
];

export const FinanceContainer: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <VerticalMenuLayout
            menu={<VerticalMenu menus={FINANCE_MENUS} />}
            contentBackground="inherit"
            menuTopExtras={
              <HStack width="full" p="20px" paddingBottom={0} margin={0}>
                <Heading size="lg" fontWeight="semibold">
                  {fixtures.financeStrings["finance.page.title"]}
                </Heading>
              </HStack>
            }
          />
        }
      >
        <Route index element={<Navigate to="banks" />} />
        <Route path="banks" element={<div>Hello Banks</div>} />
      </Route>
    </Routes>
  );
};
