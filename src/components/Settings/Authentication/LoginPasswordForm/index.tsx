import React, { Fragment, useEffect } from "react";
import { VStack, useBoolean, HStack, Box, Button } from "@chakra-ui/react";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { Form } from "@/elements";
import { useChangePasswordSubmit } from "./useChangePasswordSubmit";
import { FormAlert } from "./FormAlert";
import { fixtures } from "@/constant/datasets/fixtures";

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
                            value={
                                fixtures.settingsStrings[
                                    "authentication.passwordform.readonly-input"
                                ]
                            }
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
                            <IfFeatureEnabled
                                feature={featureFlags.enable_password_change}
                            >
                                <Button size="sm" onClick={onChangingPassword}>
                                    {
                                        fixtures.settingsStrings[
                                            "authentication.passwordform.changepassword.buttontext"
                                        ]
                                    }
                                </Button>
                            </IfFeatureEnabled>
                            <Button
                                size="sm"
                                variant="outline"
                                colorScheme="blue"
                            >
                                {
                                    fixtures.settingsStrings[
                                        "authentication.passwordform.forgotpassword.buttontext"
                                    ]
                                }
                            </Button>
                        </HStack>
                    </Fragment>
                )}
                {changingPassword && (
                    <VStack as="form" onSubmit={submit} width="100%" gap={4}>
                        <Form.PasswordField
                            label={
                                fixtures.settingsStrings[
                                    "authentication.passwordform.input.currentpassword.label"
                                ]
                            }
                            id="old-password"
                            error={inputErrors["old-password"]}
                            contentEditable={false}
                        />
                        <Form.PasswordField
                            label={
                                fixtures.settingsStrings[
                                    "authentication.passwordform.input.newpassword.label"
                                ]
                            }
                            id="new-password"
                            error={inputErrors["new-password"]}
                            contentEditable={false}
                            helperText={
                                fixtures.settingsStrings[
                                    "authentication.passwordform.input.newpassword.helpertext"
                                ]
                            }
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
                                {
                                    fixtures.settingsStrings[
                                        "authentication.passwordform.submit.buttontext"
                                    ]
                                }
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => {
                                    resetForm();
                                    toggle();
                                }}
                            >
                                {
                                    fixtures.settingsStrings[
                                        "authentication.passwordform.cancel.buttontext"
                                    ]
                                }
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </VStack>
        </Fragment>
    );
};
