import { HStack, Text } from "@chakra-ui/react";
import React from "react";

type RowStandardProps = {
    label: string;
    data: string;
};
export const RowStandard: React.FC<RowStandardProps> = ({ label, data }) => {
    return (
        <HStack width={"100%"} justifyContent="space-between">
            <Text color="text-soft">{label}</Text>
            <Text color="text-hard" fontWeight={"bold"}>
                {data}
            </Text>
        </HStack>
    );
};
