import { useAccount } from "@/lib/Accounts/useAccount";
import { EditIcon } from "@chakra-ui/icons";
import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const AvatarSection: React.FC = () => {
  const account = useAccount();

  return (
    <VStack
      width="100%"
      border="0px solid green"
      p={"20px"}
      alignItems="center"
    >
      <HStack alignItems="flex-start" width="inherit">
        <Text fontWeight={"bold"} fontSize="sm">
          Profile Picture
        </Text>
      </HStack>
      <Avatar
        width="230px"
        height="230px"
        size={"2xl"}
        name={account?.displayName ?? account?.email}
        src={account?.photo_url ?? ""}
      />
      <Button size={"sm"}>
        <EditIcon /> Edit
      </Button>
    </VStack>
  );
};
