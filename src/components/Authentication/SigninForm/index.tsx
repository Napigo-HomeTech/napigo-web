import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { Form } from "@/elements";
import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSignInForm } from "./useSignInForm";
import { FormControl, Box, Button, VStack } from "@chakra-ui/react";
import { FormError } from "@/elements/Form";
import { fixtures } from "@/constant/datasets/fixtures";

/**
 *
 */
const inputIds = {
    email: "signin-email",
    psw: "signin-password",
};

export const SigninForm: React.FC = () => {
    const { submit, inputErrors, formState, submitError, clearFormErrors } = useSignInForm(inputIds);

    useEffect(() => {
        return () => {
            clearFormErrors();
        };
    }, [clearFormErrors]);

    return (
        <Box as="form" display="flex" flexDirection={"column"} gap={4} onSubmit={submit}>
            <Form.TextField
                error={inputErrors[inputIds.email]}
                id={inputIds.email}
                type="email"
                placeholder={fixtures.authenticationStrings["login.form.email-input.placeholder"]}
                autoComplete="off"
                spellCheck={false}
            />

            <Form.PasswordField
                id={inputIds.psw}
                placeholder={fixtures.authenticationStrings["login.form.password-input.placeholder"]}
                error={inputErrors[inputIds.psw]}
            />

            <FormError message={submitError} title="Error !" alignment="stack" />

            <FormControl>
                <Button type="submit" colorScheme="brand-gr" isLoading={formState === "submitting"} width="100%">
                    {fixtures.authenticationStrings["login.form.submit.buttontext"]}
                </Button>
            </FormControl>
            <IfFeatureEnabled feature={featureFlags.enable_self_registration}>
                <Button w="100%" variant="ghost" as={RouterLink} to="register">
                    {fixtures.authenticationStrings["login.form.register.buttontext"]}
                </Button>
            </IfFeatureEnabled>

            <VStack gap={4}>
                <Button colorScheme={"base"}>Base Button</Button>
                <Button colorScheme={"gray"}>Gray Button</Button>
                <Button colorScheme={"brand-gr"}>Gray Button</Button>
                <Button colorScheme={"secondary"}>Gray Button</Button>
                <Button colorScheme={"brand"}>Standard</Button>
            </VStack>
        </Box>
    );
};

SigninForm.whyDidYouRender = true;
