import { BudgetItem } from "@/lib/API/finance-apis";
import { Heading, VStack } from "@chakra-ui/react";
import React from "react";

export const BudgetThumbnail: React.FC<BudgetItem> = (props) => {
    return (
        <VStack borderColor={"border"} borderWidth={1} rounded={"md"} height="80px" justifyContent={"center"} alignItems="center">
            <Heading size={"md"}>{props.revision}</Heading>
        </VStack>
    );
};
