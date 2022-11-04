import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    CloseButton,
} from "@chakra-ui/react";

import React from "react";

export type FormAlertProps = {
    status?: "success" | "error";
    errorMessage?: string;
    visible: boolean;
    onCloseAlert: () => void;
};
export const FormAlert: React.FC<FormAlertProps> = ({
    status,
    errorMessage,
    visible,
    onCloseAlert,
}) => {
    return visible ? (
        <Alert status={status === "success" ? "success" : "error"}>
            <CloseButton
                alignSelf="flex-start"
                position="absolute"
                right={1}
                top={1}
                onClick={onCloseAlert}
            />
            <AlertIcon />
            <Box>
                <AlertTitle>
                    {status === "success" ? "Password Updated!" : "Error!"}
                </AlertTitle>
                <AlertDescription>
                    {status === "success"
                        ? "Please use your new password for your next Login"
                        : errorMessage}
                </AlertDescription>
            </Box>
        </Alert>
    ) : (
        <></>
    );
};
