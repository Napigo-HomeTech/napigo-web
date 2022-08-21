import { VStack, useBoolean, HStack, Button } from "@chakra-ui/react";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { FIXTURES } from "@/constant/global-fixture";
import { Form } from "@/elements";
import React from "react";

export const LoginEmailForm: React.FC = () => {
  const [altEmailFormVisible, { toggle }] = useBoolean();

  return (
    <VStack w="100%" alignItems={"start"} gap={4}>
      <Form.TextField
        label="Primary"
        value="napigo.standard.a@gmail.com"
        contentEditable={false}
        isReadOnly
        helperText={
          FIXTURES.account.authentication.primary_email_input_helper_text
        }
      />
      {altEmailFormVisible && (
        <Form.TextField
          label="Alternative Email"
          placeholder="newemail@example.com"
        />
      )}
      <IfFeatureEnabled feature={featureFlags.enable_alternative_email_backup}>
        <HStack>
          {altEmailFormVisible && (
            <Button size="sm" colorScheme="brand">
              Confirm
            </Button>
          )}
          <Button size="sm" onClick={() => toggle()}>
            {altEmailFormVisible ? "Cancel" : "Add Alternative Email"}
          </Button>
        </HStack>
      </IfFeatureEnabled>
    </VStack>
  );
};
