import { fixtures } from "@/constant/datasets/fixtures";
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
                        <AlertTitle>
                            {
                                fixtures.settingsStrings[
                                    "authentication.mobileform.verified-alert.title"
                                ]
                            }
                        </AlertTitle>
                        <AlertDescription>
                            {
                                fixtures.settingsStrings[
                                    "authentication.mobileform.verified-alert.description"
                                ]
                            }
                        </AlertDescription>
                    </VStack>
                </Alert>
            )}
            <Form.TextField
                name="mobile_no"
                id="mobile_no"
                isReadOnly
                value={verifiedPhoneNumber ?? ""}
                placeholder={
                    fixtures.settingsStrings[
                        "authentication.mobileform.readonly.input.placeholder"
                    ]
                }
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
                {
                    fixtures.settingsStrings[
                        "authentication.mobileform.update-number.buttontext"
                    ]
                }
            </Button>
        </VStack>
    );
};
