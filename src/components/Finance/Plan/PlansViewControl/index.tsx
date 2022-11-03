import { fixtures } from "@/constant/datasets/fixtures";
import { Form } from "@/elements";
import { Button, HStack, IconButton, VStack } from "@chakra-ui/react";
import { FaSearch as SearchIcon, FaList as TableViewIcon } from "react-icons/fa";
import { BsFillGridFill as GridViewIcon } from "react-icons/bs";

import React, { useCallback, useState } from "react";

export const PlansViewControl: React.FC = () => {
    const [viewType, setViewType] = useState<"table" | "grid">("grid");

    const getActiveViewButtonState = useCallback(
        (view: string) => {
            if (view === viewType) {
                return {
                    borderColor: "brand.500",
                    color: "brand.500",
                };
            }
            return {};
        },
        [viewType]
    );

    return (
        <VStack width={"100%"} flexDirection="row" alignItems="flex-start" justifyContent="space-between">
            <HStack gap={0} width="inherit" alignItems="flex-end">
                <Form.TextField
                    autoComplete="off"
                    containerWidth="auto"
                    spellCheck={false}
                    placeholder={fixtures.financeStrings["finance.plan.gridview.control.search.placeholder"]}
                    bg="body"
                />{" "}
                <Button colorScheme="base" leftIcon={<SearchIcon />}>
                    {fixtures.financeStrings["finance.plan.gridview.control.search.button.text"]}
                </Button>
                <Button colorScheme="base">In-use</Button>
                <Button colorScheme="secondary">{fixtures.financeStrings["finance.plan.gridview.control.create-plan.button.text"]}</Button>
            </HStack>
            <HStack>
                <IconButton onClick={() => setViewType("table")} colorScheme="base" aria-label="table-view" {...getActiveViewButtonState("table")}>
                    <TableViewIcon />
                </IconButton>
                <IconButton onClick={() => setViewType("grid")} colorScheme="base" aria-label="grid-view" {...getActiveViewButtonState("grid")}>
                    <GridViewIcon />
                </IconButton>
            </HStack>
        </VStack>
    );
};
