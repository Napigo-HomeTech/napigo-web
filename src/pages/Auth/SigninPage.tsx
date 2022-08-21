import React from "react";
import { SigninForm } from "@/components/SigninForm";
import { FIXTURES } from "@/constant/global-fixture";
import { Box, Text } from "@chakra-ui/react";

export const SigninPage: React.FC = () => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      gap={6}
      maxWidth="400px"
      mx="auto"
    >
      <Text fontSize="xl" fontWeight={"bold"}>
        {FIXTURES.auth.signin_form_title}
      </Text>
      <SigninForm />
    </Box>
  );
};
