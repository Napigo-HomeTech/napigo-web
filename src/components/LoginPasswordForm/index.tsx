import React, { Fragment, useEffect } from "react";
import { VStack, useBoolean, HStack, Box, Button } from "@chakra-ui/react";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { Form } from "@/elements";
import { useChangePasswordSubmit } from "./useChangePasswordSubmit";
import { FormAlert } from "./FormAlert";

const inputKeys = {
  "old-password": "old-password",
  "new-password": "new-password",
};
export const LoginPasswordForm: React.FC = () => {
  const [changingPassword, { toggle }] = useBoolean();

  const { formState, submit, resetForm, inputErrors, submitError } =
    useChangePasswordSubmit(inputKeys);

  useEffect(() => {
    if (formState === "onsuccess") {
      toggle();
    }
  }, [formState, toggle]);

  const onChangingPassword = (_: React.MouseEvent) => {
    if (formState === "onsuccess") {
      resetForm();
    }
    toggle();
  };

  return (
    <Fragment>
      <VStack w="100%" alignItems={"start"}>
        {!changingPassword && (
          <Fragment>
            <Form.PasswordField
              value="napigo.standard.a@gmail.com"
              contentEditable={false}
              isReadOnly
              alwaysMask
            />
            <Box w="100%" paddingY="10px">
              <FormAlert
                visible={formState === "onsuccess"}
                status="success"
                onCloseAlert={() => {
                  resetForm();
                }}
              />
            </Box>
            <HStack justifyContent="flex-start" w="100%">
              <IfFeatureEnabled feature={featureFlags.enable_password_change}>
                <Button size="sm" onClick={onChangingPassword}>
                  Change Password
                </Button>
              </IfFeatureEnabled>
              <Button size="sm" variant="outline" colorScheme="blue">
                Forgot password ?
              </Button>
            </HStack>
          </Fragment>
        )}
        {changingPassword && (
          <VStack as="form" onSubmit={submit} width="100%" gap={4}>
            <Form.PasswordField
              label="Old Password"
              id="old-password"
              error={inputErrors["old-password"]}
              contentEditable={false}
            />
            <Form.PasswordField
              label="New Password"
              id="new-password"
              error={inputErrors["new-password"]}
              contentEditable={false}
              helperText="Please make sure that your password is at least 8 charaters with alphanumeric and digits"
            />
            <FormAlert
              visible={formState === "onerror"}
              onCloseAlert={() => {
                resetForm();
              }}
              status="error"
              errorMessage={submitError ?? ""}
            />

            <HStack justifyContent="flex-start" w="100%">
              <Button
                type="submit"
                size="sm"
                colorScheme="brand"
                isLoading={formState === "submitting"}
              >
                Confirm
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  resetForm();
                  toggle();
                }}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Fragment>
  );
};
