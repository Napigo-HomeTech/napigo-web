import React from "react";
import { SigninForm } from "@/components/Authentication/SigninForm";
import { Box, Text } from "@chakra-ui/react";
import { getMessage } from "@/constant/datasets/fixtures";

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
        {getMessage("authenticationStrings", "login.form.title")}
      </Text>
      <SigninForm />
    </Box>
  );
};
