import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "./useRegisterForm";
import { FormControl, Input, Box, FormHelperText, Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { Form } from "@/elements";
import { getMessage } from "@/constant/datasets/fixtures";

const inputIds = {
    email: "register-email",
    psw: "register-password",
    username: "register-username",
};

export const RegisterForm: React.FC = () => {
    const { submit, inputErrors, submitError, formStatus, clearFormErrors } = useRegisterForm(inputIds);

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            clearFormErrors();
        };
    }, [clearFormErrors]);

    return (
        <Box as="form" display="flex" flexDirection="column" gap={4} onSubmit={submit}>
            <FormControl>
                <Input
                    isInvalid={inputErrors[inputIds.email] !== undefined}
                    id={inputIds.email}
                    type={"email"}
                    placeholder={getMessage("authenticationStrings", "register.form.email-input.placeholder")}
                    autoComplete="off"
                    spellCheck={false}
                />
                {inputErrors[inputIds.email] !== undefined && <FormHelperText color={"red.200"}>{inputErrors[inputIds.email]}</FormHelperText>}
            </FormControl>

            <Form.PasswordField
                id={inputIds.psw}
                error={inputErrors[inputIds.psw]}
                placeholder={getMessage("authenticationStrings", "register.form.password-input.placholder")}
            />

            <FormControl>
                <Input
                    id={inputIds.username}
                    type={"text"}
                    placeholder={getMessage("authenticationStrings", "register.form.name-input.placeholder")}
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

            <Button type="submit" isLoading={formStatus === "submitting"} w={"100%"} colorScheme="brand">
                {getMessage("authenticationStrings", "register.form.submit.buttontext")}
            </Button>

            <Button w={"100%"} onClick={() => navigate("/auth")}>
                {getMessage("authenticationStrings", "register.form.login.buttontext")}
            </Button>
        </Box>
    );
};
