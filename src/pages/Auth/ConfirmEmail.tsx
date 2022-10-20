import React, { useMemo, useState } from "react";
import { getUser, sendEmailVerificationMethod } from "@/lib/Auth";
import { delayInvoke } from "@/lib/utils/delays";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { LoadStatus } from "@/types";
import { getAuth } from "firebase/auth";
import { Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { Card } from "@/elements";
import { Navigate } from "react-router-dom";
import { fixtures } from "@/constant/datasets/fixtures";

const auth = getAuth();

export const ConfirmEmail: React.FC = () => {
    const user = getUser();

    const [loadStatus, setLoadStatus] = useState<LoadStatus>("idle");

    const DescriptionText = useMemo(() => {
        if (loadStatus === "onsuccess") {
            return fixtures.authenticationStrings["email-confirmation.post.description"];
        }
        return fixtures.authenticationStrings["email-confirmation.pre.description"];
    }, [loadStatus]);

    const sendEmail = async (_: React.MouseEvent) => {
        if (user) {
            try {
                setLoadStatus("loading");
                await sendEmailVerificationMethod(user);
                delayInvoke(() => {
                    setLoadStatus("onsuccess");
                });
            } catch (err) {
                setLoadStatus("onerror");
            }
        }
    };

    const handleLogout = async (_: React.MouseEvent) => {
        await auth.signOut();
    };

    if (user && user.emailVerified) {
        return <Navigate to="/user" />;
    }

    return (
        <Box mx="auto" display="flex" flexDirection="row" alignItems="center" justifyContent="center" h="100vh">
            <Card maxWidth="500px" h="auto" alignItems="center" justifyContent="center">
                {loadStatus === "onsuccess" ? (
                    <Box color="brand.500" className="text-success mb-[10px]">
                        <FaCheckCircle size={60} />
                    </Box>
                ) : (
                    <Box className="text-success mb-[10px]">
                        <FaEnvelope size={40} className={"mb-[10px]"} />
                    </Box>
                )}

                <Heading size="md">
                    {loadStatus === "onsuccess"
                        ? fixtures.authenticationStrings["email-confirmation.post.title"]
                        : fixtures.authenticationStrings["email-confirmation.pre.title"]}
                </Heading>
                <Text textAlign="center">{DescriptionText}</Text>

                <HStack gap={2}>
                    <Button colorScheme="brand" onClick={sendEmail} isLoading={loadStatus === "loading"}>
                        {fixtures.authenticationStrings[`email-confirmation.${loadStatus}.buttontext`]}
                    </Button>
                    <Button variant="ghost" onClick={handleLogout}>
                        {fixtures.authenticationStrings["email-confirmation.logoutnow.buttontext"]}
                    </Button>
                </HStack>
            </Card>
        </Box>
    );
};
