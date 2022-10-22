import BudgetsGrid from "@/components/Finance/Budgets/BudgetsGrid";
import { Box, Stack } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";

export const BudgetListingPage: React.FC = () => {
    return (
        <Fragment>
            <Stack gap={4} flexDirection="column" p={"20px"}>
                <Box width="100%" height="100px" borderWidth={1} rounded={"md"} />
                <BudgetsGrid />
            </Stack>
        </Fragment>
    );
};

/* <SimpleGrid columns={4} minChildWidth="250px" spacing={5}>
    {Array(100)
        .fill(0)
        .map((index) => {
            return <Box key={uniqueId()} bg="gray.800" opacity={0.7} rounded="md" height="150px"></Box>;
        })}
</SimpleGrid> */
