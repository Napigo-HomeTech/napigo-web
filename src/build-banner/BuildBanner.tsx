import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { AppConfig } from "@/config/app.config";

export const BuildBanner: React.FC = () => {
    if (AppConfig.environment === "uat") {
        return (
            <Box
                bgGradient={"linear(to-r, brandAlpha.800, brandAlpha.200)"}
                display={"flex"}
                alignItems="center"
                justifyContent="center"
                padding={"1px"}
                paddingY="5px"
                fontWeight={"bold"}
                gap={2}
            >
                <Text fontSize={"sm"} fontWeight="normal">
                    UAT Environment Build ID: {AppConfig.build.id}, Build Commit Ref: {AppConfig.build.commitRef}, powered by{" "}
                    {AppConfig.build.poweredBy}
                </Text>
            </Box>
        );
    }
    return <></>;
};
