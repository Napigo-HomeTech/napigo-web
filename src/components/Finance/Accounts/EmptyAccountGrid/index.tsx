import { fixtures } from "@/constant/datasets/fixtures";
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

export const EmptyAccountGrid: React.FC = () => {
    return (
        <Box
            display={"flex"}
            flexDirection="column"
            minHeight={"500px"}
            alignItems="center"
            justifyContent="center"
            gap={2}
        >
            <Text fontSize={"md"} fontWeight="normal" color="text-hard">
                {fixtures.financeStrings["finance.accounts.empty.headingtext"]}
            </Text>
            <Button colorScheme={"brand"} variant="ghost">
                {
                    fixtures.financeStrings[
                        "finance.accounts.empty.createnew.buttontext"
                    ]
                }
            </Button>
        </Box>
    );
};
0;
