import { HStack, Text } from "@chakra-ui/react";
import React from "react";

type RowStandardProps = {
    label: string;
    data: string;
};
export const DataRow: React.FC<RowStandardProps> = ({ label, data }) => {
    return (
        <HStack width={"100%"} justifyContent="space-between" fontSize={"sm"}>
            <Text color="text-soft">{label}</Text>
            <Text color="text-hard" fontWeight={"semibold"}>
                {data}
            </Text>
        </HStack>
    );
};
