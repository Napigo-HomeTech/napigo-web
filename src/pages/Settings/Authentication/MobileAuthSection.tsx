import { Divider, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { MobileAddForm } from "@/components/MobileNumberSetting/AddMobile";
import { Card } from "@/elements";
import React, { useState } from "react";
import { MdPhoneIphone as MobileIcon } from "react-icons/md";
import { getUser } from "@/lib/Auth";
// import { MobileAuthForm } from "@/components/MobileAuthForm";

export const MobileAuthSection: React.FC = () => {
  const [phoneVerified, setPhoneVerified] = useState<boolean>(true);

  return (
    <Card w="100%">
      <VStack w="100%" flex={1} gap={3}>
        <HeadBar />

        <Text>
          {!phoneVerified ? (
            <>
              Provide us with your mobile number to allow mobile authentication
              for your login method or you can use for backup in case you
              couldnt logon to your email address
            </>
          ) : (
            <>
              Your phone number can be used as backup when losing your password
              or forgotten your login email address. It can be used for MFA,
              please refer to the MFA section on setup.
            </>
          )}
        </Text>

        {!phoneVerified && <MobileAddForm />}
        {/* {phoneVerified && <MobileAuthForm />} */}
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
