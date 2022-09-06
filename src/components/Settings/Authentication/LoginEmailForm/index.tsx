import { VStack, useBoolean, HStack, Button } from "@chakra-ui/react";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { Form } from "@/elements";
import React from "react";
import { getMessage } from "@/constant/datasets/fixtures";

export const LoginEmailForm: React.FC = () => {
  const [altEmailFormVisible, { toggle }] = useBoolean();

  return (
    <VStack w="100%" alignItems={"start"} gap={4}>
      <Form.TextField
        label={getMessage(
          "settingsStrings",
          "authentication.emailloginform.primary.input.label"
        )}
        value="napigo.standard.a@gmail.com"
        contentEditable={false}
        isReadOnly
        helperText={getMessage(
          "settingsStrings",
          "authentication.emailloginform.primary.input.helpertext"
        )}
      />
      {altEmailFormVisible && (
        <Form.TextField
          label={getMessage(
            "settingsStrings",
            "authentication.emailloginform.alternative.input.label"
          )}
          placeholder={getMessage(
            "settingsStrings",
            "authentication.emailloginform.alternative.input.placeholder"
          )}
        />
      )}
      <IfFeatureEnabled feature={featureFlags.enable_alternative_email_backup}>
        <HStack>
          {altEmailFormVisible && (
            <Button size="sm" colorScheme="brand">
              {getMessage(
                "settingsStrings",
                "authentication.emailloginform.submit.buttontext"
              )}
            </Button>
          )}
          <Button size="sm" onClick={() => toggle()}>
            {getMessage(
              "settingsStrings",
              `authentication.emailloginform.${
                altEmailFormVisible ? "cancel" : "add"
              }.buttontext`
            )}
          </Button>
        </HStack>
      </IfFeatureEnabled>
    </VStack>
  );
};
