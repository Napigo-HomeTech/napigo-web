import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const BuildBanner: React.FC = () => {
  if (import.meta.env.VITE_ENVIRONMENT === "uat") {
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
        <Text>
          UAT Environment Build, Build ID: [{import.meta.env.VITE_BUILD_ID}]
        </Text>
        <Text fontSize={"sm"} fontWeight="light">
          powered by {import.meta.env.VITE_POWERED_BY}
        </Text>
      </Box>
    );
  }
  return <></>;
};
