import { BudgetsList } from "@/components/Finance/Budgets/BudgetsList";
import { Box, Stack } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";

export const BudgetListingPage: React.FC = () => {
    return (
        <Fragment>
            <Stack gap={4} flexDirection="column" p={"20px"}>
                <Box width="100%" height="100px" borderWidth={1} rounded={"md"} />
                <BudgetsList />
            </Stack>
        </Fragment>
    );
};
