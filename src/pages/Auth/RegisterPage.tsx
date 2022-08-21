import { RegisterForm } from "@/components/RegisterForm";
import { featureFlags } from "@/config/feature-flags";
import { FIXTURES } from "@/constant/global-fixture";
import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { useFeatureRestrictRoute } from "@/routers/useFeatureRestrictRoute";

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
        {FIXTURES.auth.register_form_title}
      </Text>
      <RegisterForm />
    </Box>
  );
};
