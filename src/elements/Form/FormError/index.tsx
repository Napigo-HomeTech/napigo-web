import React from "react";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";

type FormErrorProps = {
    title?: string;
    message?: string | null;
    alignment?: "inline" | "stack";
};
export const FormError: React.FC<FormErrorProps> = ({
    title,
    message,
    alignment = "inline",
}) => {
    if (isEmpty(message)) {
        return null;
    }
    return (
        <Alert status="error" variant="left-accent" borderRadius={3}>
            <AlertIcon />
            {alignment === "stack" && (
                <Box>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Box>
            )}
            {alignment === "inline" && (
                <>
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </>
            )}
        </Alert>
    );
};
