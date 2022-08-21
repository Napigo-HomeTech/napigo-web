import React, { useCallback, useState } from "react";
import { FIXTURES } from "@/constant/global-fixture";
import { getUser, sendEmailVerificationMethod } from "@/lib/Auth";
import { delayInvoke } from "@/lib/utils/delays";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { LoadStatus } from "@/types";
import { getAuth } from "firebase/auth";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Card } from "@/elements";
import { Navigate } from "react-router-dom";

const auth = getAuth();

export const ConfirmEmail: React.FC = () => {
  const user = getUser();

  const [loadStatus, setLoadStatus] = useState<LoadStatus>("idle");

  const setDescText = useCallback(() => {
    switch (loadStatus) {
      case "idle":
        return FIXTURES.confirm_email.pre_description;
      case "onsuccess":
        return FIXTURES.confirm_email.post_description;
      default:
        return "";
    }
  }, [loadStatus]);

  const sendEmail = async (ev: React.MouseEvent) => {
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

  const handleLogout = async (ev: React.MouseEvent) => {
    await auth.signOut();
  };

  if (user && user.emailVerified) {
    return <Navigate to="/user" />;
  }

  return (
    <Box
      mx="auto"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Card
        maxWidth="500px"
        h="auto"
        alignItems="center"
        justifyContent="center"
      >
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
            ? FIXTURES.confirm_email.send_title
            : FIXTURES.confirm_email.title}
        </Heading>
        <Text textAlign="center">{setDescText()}</Text>

        <Button
          colorScheme="brand"
          onClick={sendEmail}
          isLoading={loadStatus === "loading"}
        >
          {FIXTURES.confirm_email.buttonText[loadStatus]}
        </Button>
        <Button variant="ghost" onClick={handleLogout}>
          {FIXTURES.confirm_email.buttonText.logoutNow}
        </Button>
      </Card>
    </Box>
  );
};
