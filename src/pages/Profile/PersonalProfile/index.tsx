import { PersonalInfoCardForm } from "@/components/Profile/PersonalProfile/PersonalInfoCardForm";
import { WorkCardForm } from "@/components/Profile/PersonalProfile/WorkCardForm";
import { fixtures } from "@/constant/datasets/fixtures";
import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const PersonalProfilePage: React.FC = () => {
  return (
    <VStack flexDirection="column" p="20px" gap={5} width="100%">
      <HStack w="100%" justifyContent="space-between" p={0} alignItems="end">
        <Heading size="lg" fontWeight="normal" color="heading">
          {
            fixtures.profileStrings[
              "personal-profile.personal-information.title"
            ]
          }
        </Heading>
        <Button as={RouterLink} to={"/user/console"} size="sm">
          {
            fixtures.profileStrings[
              "personal-profile.personal-information.backbuttontext"
            ]
          }
        </Button>
      </HStack>
      <PersonalInfoCardForm />
      <WorkCardForm />
    </VStack>
  );
};
