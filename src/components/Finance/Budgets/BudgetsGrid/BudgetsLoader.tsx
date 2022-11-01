import { Box } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";

export const BudgetsLoader: React.FC = () => {
    return (
        <>
            {Array(8)
                .fill(0)
                .map((_) => (
                    <Box
                        key={uniqueId()}
                        bg="gray.800"
                        rounded={"md"}
                        height="80px"
                        flexDirection={"row"}
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                    ></Box>
                ))}
        </>
    );
};
