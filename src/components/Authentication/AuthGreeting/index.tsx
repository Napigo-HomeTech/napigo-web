import { NapigoLogoLg as Logo } from "../../../common/Logo";
import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { getMessage } from "@/constant/datasets/fixtures";

type AuthGreetingProps = {
  type: "register" | "login";
};
export const AuthGreeting: React.FC<AuthGreetingProps> = ({ type }) => {
  return (
    <VStack
      display="flex"
      alignItems={{ base: "center", sm: "center", md: "start" }}
      gap={0}
    >
      <Box>
        <Logo />
      </Box>
      <Text
        display={{ base: "flex", md: "flex" }}
        textAlign={{ base: "center", md: "start" }}
        px={{ base: "20px", md: 0 }}
        fontSize={{ base: "sm", md: "md" }}
      >
        {getMessage("authenticationStrings", `${type}.subtext`)}
      </Text>
    </VStack>
  );
};
