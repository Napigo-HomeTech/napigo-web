import { Form } from "@/elements";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  HStack,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useMobileSetting } from ".";

export const MobileReadOnly: React.FC = () => {
  const { verifiedPhoneNumber, setFormType, recentlyVerified } =
    useMobileSetting();

  return (
    <VStack width="100%" gap={2} alignItems="start">
      {recentlyVerified && (
        <Alert status="success" variant="left-accent">
          <VStack alignItems="flex-start">
            <AlertTitle>Verified!</AlertTitle>
            <AlertDescription>
              Your Phone number have been added, you can now setup MFA for
              better security login
            </AlertDescription>
          </VStack>
        </Alert>
      )}
      <Form.TextField
        name="mobile_no"
        id="mobile_no"
        isReadOnly
        value={verifiedPhoneNumber ?? ""}
        placeholder="Mobile number"
        inputLeftElement={
          <InputLeftElement
            children={
              <HStack>
                <PhoneIcon color="gray.300" />
              </HStack>
            }
          />
        }
      />
      <Button size="sm" onClick={() => setFormType("onUpdate")}>
        Update phone number
      </Button>
    </VStack>
  );
};
