import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { Form } from "@/elements";
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSignInForm } from "./useSignInForm";
import { FormControl, Box, Button } from "@chakra-ui/react";
import { FIXTURES } from "@/constant/global-fixture";
import { FormError } from "@/elements/Form";

/**
 *
 */
const inputIds = {
  email: "signin-email",
  password: "signin-password",
};

export const SigninForm: React.FC = () => {
  const { submit, inputErrors, formState, submitError, clearFormErrors } =
    useSignInForm(inputIds);

  useEffect(() => {
    return () => {
      clearFormErrors();
    };
  }, [clearFormErrors]);

  return (
    <Box
      as="form"
      display="flex"
      flexDirection={"column"}
      gap={4}
      onSubmit={submit}
    >
      <Form.TextField
        error={inputErrors[inputIds.email]}
        id={inputIds.email}
        type="email"
        placeholder="Email Address"
        autoComplete="off"
        spellCheck={false}
        autoFocus={true}
      />

      <Form.PasswordField
        id={inputIds.password}
        placeholder="Password"
        error={inputErrors[inputIds.password]}
      />

      <FormError message={submitError} title="Error !" alignment="stack" />

      <FormControl>
        <Button
          type="submit"
          isLoading={formState === "submitting"}
          width="100%"
          colorScheme={"brand"}
        >
          {FIXTURES.auth.login_button_text}
        </Button>
      </FormControl>
      <IfFeatureEnabled feature={featureFlags.enable_self_registration}>
        <Button w="100%" as={RouterLink} to="register">
          {FIXTURES.auth.register_button_text}
        </Button>
      </IfFeatureEnabled>
    </Box>
  );
};

SigninForm.whyDidYouRender = true;
