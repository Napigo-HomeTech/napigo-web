import { Divider, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { MobileAuthForm } from "@/components/MobileAuthForm";
import { Card } from "@/elements";
import React from "react";
import { MdPhoneIphone as MobileIcon } from "react-icons/md";

export const MobileAuthSection: React.FC = () => {
  return (
    <Card w="100%">
      <VStack w="100%" flex={1} gap={3}>
        <HeadBar />

        <Text>
          Provide us with your mobile number to allow mobile authentication for
          your login method or you can use for backup in case you couldnt logon
          to your email address
        </Text>

        <MobileAuthForm />
      </VStack>
    </Card>
  );
};

const HeadBar = () => (
  <VStack width="inherit">
    <HStack width="inherit">
      <Heading size="md" mb="5px">
        Mobile Number
      </Heading>
      <MobileIcon size={20} />
    </HStack>
    <Divider />
  </VStack>
);
