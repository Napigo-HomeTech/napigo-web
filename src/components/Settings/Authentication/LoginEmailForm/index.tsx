import { VStack, useBoolean, HStack, Button } from "@chakra-ui/react";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { Form } from "@/elements";
import React from "react";
import { fixtures } from "@/constant/datasets/fixtures";

export const LoginEmailForm: React.FC = () => {
    const [altEmailFormVisible, { toggle }] = useBoolean();

    return (
        <VStack w="100%" alignItems={"start"} gap={4}>
            <Form.TextField
                label={
                    fixtures.settingsStrings[
                        "authentication.emailloginform.primary.input.label"
                    ]
                }
                value="napigo.standard.a@gmail.com"
                contentEditable={false}
                isReadOnly
                helperText={
                    fixtures.settingsStrings[
                        "authentication.emailloginform.primary.input.helpertext"
                    ]
                }
            />
            {altEmailFormVisible && (
                <Form.TextField
                    label={
                        fixtures.settingsStrings[
                            "authentication.emailloginform.alternative.input.label"
                        ]
                    }
                    placeholder={
                        fixtures.settingsStrings[
                            "authentication.emailloginform.alternative.input.placeholder"
                        ]
                    }
                />
            )}
            <IfFeatureEnabled
                feature={featureFlags.enable_alternative_email_backup}
            >
                <HStack>
                    {altEmailFormVisible && (
                        <Button size="sm" colorScheme="brand">
                            {
                                fixtures.settingsStrings[
                                    "authentication.emailloginform.submit.buttontext"
                                ]
                            }
                        </Button>
                    )}
                    <Button size="sm" onClick={() => toggle()}>
                        {
                            fixtures.settingsStrings[
                                `authentication.emailloginform.${
                                    altEmailFormVisible ? "cancel" : "add"
                                }.buttontext`
                            ]
                        }
                        ,
                    </Button>
                </HStack>
            </IfFeatureEnabled>
        </VStack>
    );
};
