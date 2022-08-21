import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const BuildBanner: React.FC = () => {
  if (import.meta.env.VITE_ENVIRONMENT === "uat") {
    return (
      <Box
        bgGradient={"linear(to-r, brandAlpha.800, brandAlpha.200)"}
        display={"flex"}
        justifyContent="center"
        padding={"1px"}
        paddingY="5px"
        fontWeight={"bold"}
      >
        <Text>UAT Environment Build</Text>
      </Box>
    );
  }
  return <></>;
};
