import { fixtures } from "@/constant/datasets/fixtures";
import { Card, Form } from "@/elements";
import { Button, HStack } from "@chakra-ui/react";
import { FaSearch as SearchIcon } from "react-icons/fa";
import React from "react";

export const PlanGridControl: React.FC = () => {
    return (
        <Card width={"100%"} alignItems="flex-start" justifyContent="flex-start">
            <HStack gap={0} width="inherit" alignItems="flex-end">
                <Form.TextField
                    autoComplete="off"
                    containerWidth="auto"
                    spellCheck={false}
                    placeholder={fixtures.navStrings["search.placeholder"]}
                    bg="body"
                />{" "}
                <Button bg="white" leftIcon={<SearchIcon />}>
                    Search
                </Button>
                <Button bg="white">In-use</Button>
                <Button bg="secondary" color="white" borderColor="secondary" _hover={{ bg: "secondary", borderColor: "orange.600" }}>
                    + Create Plan
                </Button>
            </HStack>
        </Card>
    );
};
