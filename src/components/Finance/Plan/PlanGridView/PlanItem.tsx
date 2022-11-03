import { Badge, Card } from "@/elements";
import { PlanSummary } from "@/types/finance.type";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { FaReceipt as PlanIcon, FaEllipsisV as MenuIcon, FaArrowRight as UsedInIcon } from "react-icons/fa";

import React, { useCallback } from "react";
import { RowStandard } from "@/elements/DataDisplay/RowStandard";
import { currencyFormat } from "@/lib/Finance/utils";

export const PlanItem: React.FC<PlanSummary> = (props) => {
    const getHealthColor = useCallback(() => {
        switch (props.asm_health) {
            case "healthy":
                return "success";
            case "warning":
                return "warning";
            case "danger":
                return "danger";
        }
    }, [props.asm_health]);

    const isInUsed = Boolean(props.in_use);
    return (
        <Card width="100%" borderColor={isInUsed ? "brand.500" : "border"} borderWidth={1} p="10px" rounded="md">
            <HStack width={"100%"} borderBottom={"1px"} borderBottomColor="border" justifyContent="space-between" pb="10px">
                <HStack>
                    <Box color={"brand.500"}>
                        <PlanIcon color="inherit" />
                    </Box>
                    <Heading size={"sm"}>{props.title}</Heading>
                </HStack>
                <HStack>
                    {props.in_use && (
                        <Box bg="brand.50" px="20px" rounded="md" color="brand.500">
                            <Text>In-use</Text>
                        </Box>
                    )}
                    <Button colorScheme="gray" variant={"ghost"} px="3px">
                        <MenuIcon />
                    </Button>
                </HStack>
            </HStack>
            <VStack>
                <RowStandard label="Income" data={currencyFormat(props.income)} />
                <RowStandard label="COL" data={currencyFormat(props.col)} />
                <RowStandard label="ASM" data={currencyFormat(props.asm)} />
                <RowStandard label="Created at" data="2 days ago" />
                <HStack width={"100%"} marginTop="40px" justifyContent="space-between">
                    <Button size="sm" colorScheme={"gray"}>
                        Used in <UsedInIcon />
                    </Button>
                    <Badge color={getHealthColor()} status={props.asm_health} />
                </HStack>
            </VStack>
        </Card>
    );
};
