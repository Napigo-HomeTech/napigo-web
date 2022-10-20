import { PersonalInfoCardForm } from "@/components/Profile/PersonalProfile/PersonalInfoCardForm";
import { WorkCardForm } from "@/components/Profile/PersonalProfile/WorkCardForm";
import { fixtures } from "@/constant/datasets/fixtures";
import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const PersonalProfilePage: React.FC = () => {
    return (
        <VStack flexDirection="column" maxWidth="100%" py="30px" pr="30px" gap={5}>
            <HStack w="100%" justifyContent="space-between" p={0} alignItems="end">
                <Heading size="lg" fontWeight="normal">
                    {fixtures.profileStrings["personal-profile.personal-information.title"]}
                </Heading>
                <Button as={RouterLink} to={"/user/console"} size="sm">
                    {fixtures.profileStrings["personal-profile.personal-information.backbuttontext"]}
                </Button>
            </HStack>
            <PersonalInfoCardForm />
            <WorkCardForm />
        </VStack>
    );
};
