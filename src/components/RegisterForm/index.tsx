import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "./useRegisterForm";
import {
  FormControl,
  Input,
  Box,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import { Form } from "@/elements";
import { FIXTURES } from "@/constant/global-fixture";

const inputIds = {
  email: "register-email",
  password: "register-password",
  username: "register-username",
};

export const RegisterForm: React.FC = () => {
  const { submit, inputErrors, submitError, formStatus, clearFormErrors } =
    useRegisterForm(inputIds);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearFormErrors();
    };
  }, [clearFormErrors]);

  return (
    <Box
      as="form"
      display="flex"
      flexDirection="column"
      gap={4}
      onSubmit={submit}
    >
      <FormControl>
        <Input
          isInvalid={inputErrors[inputIds.email] !== undefined}
          id={inputIds.email}
          type={"email"}
          placeholder="Email Address"
          autoComplete="off"
          spellCheck={false}
        />
        {inputErrors[inputIds.email] !== undefined && (
          <FormHelperText color={"red.200"}>
            {inputErrors[inputIds.email]}
          </FormHelperText>
        )}
      </FormControl>

      <Form.PasswordField
        id={inputIds.password}
        error={inputErrors[inputIds.password]}
        placeholder="Password"
      />

      <FormControl>
        <Input
          id={inputIds.username}
          type={"text"}
          placeholder="Username / Name"
          autoComplete="off"
          spellCheck={false}
        />
      </FormControl>

      {submitError !== null && (
        <Alert status="error" variant={"left-accent"}>
          <AlertIcon />
          <AlertTitle>{submitError}</AlertTitle>
        </Alert>
      )}

      <Button
        type="submit"
        isLoading={formStatus === "submitting"}
        w={"100%"}
        colorScheme="brand"
      >
        {FIXTURES.auth.register_button_text}
      </Button>

      <Button w={"100%"} onClick={() => navigate("/auth")}>
        {FIXTURES.auth.back_login_button_text}
      </Button>
    </Box>
  );
};
