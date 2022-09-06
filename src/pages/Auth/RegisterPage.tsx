import { RegisterForm } from "@/components/Authentication/RegisterForm";
import { featureFlags } from "@/config/feature-flags";
import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { useFeatureRestrictRoute } from "@/routers/useFeatureRestrictRoute";
import { getMessage } from "@/constant/datasets/fixtures";

export const RegisterPage: React.FC = () => {
  useFeatureRestrictRoute(featureFlags.enable_self_registration);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      gap={6}
      maxWidth="400px"
      mx={"auto"}
    >
      <Text fontSize="xl" fontWeight={"bold"}>
        {getMessage("authenticationStrings", "register.form.title")}
      </Text>
      <RegisterForm />
    </Box>
  );
};
