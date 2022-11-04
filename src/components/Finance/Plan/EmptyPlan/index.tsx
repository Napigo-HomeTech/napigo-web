import { fixtures } from "@/constant/datasets/fixtures";
import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export const EmptyPlan: React.FC = () => {
    return (
        <HStack
            width={"100%"}
            height="300px"
            justifyContent="center"
            alignItems="center"
        >
            <Text color="text-hard">
                {fixtures.financeStrings["finance.plan.emptyplan.description"]}
            </Text>
        </HStack>
    );
};
