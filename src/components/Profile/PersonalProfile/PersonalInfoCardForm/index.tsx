import { getMessage } from "@/constant/datasets/fixtures";
import { Card } from "@/elements";
import { Avatar } from "@/elements/Avatar";
import { TextField } from "@/elements/Form";
import { useAccount } from "@/lib/Accounts/useAccount";
import { getUser } from "@/lib/Auth";
import { EditIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";

export const PersonalInfoCardForm: React.FC = () => {
  const account = useAccount();
  const user = getUser();
  return (
    <Card width={"100%"}>
      <HStack width="inherit">
        <VStack alignItems={"flex-start"} width="inherit">
          <Heading size="sm" fontWeight={"normal"} color="shadow-text">
            {getMessage(
              "profileStrings",
              "personal-profile.personal-information.avatar.label"
            )}
          </Heading>
          <HStack
            alignItems="center"
            justifyContent="start"
            gap={4}
            width="inherit"
          >
            <Avatar
              width="60px"
              height="60px"
              name={account?.displayName ?? ""}
              src={user?.photoURL ?? ""}
            />
            <VStack alignItems={"flex-start"}>
              <Heading size="sm" py={0} lineHeight={0.5}>
                {account?.displayName}
              </Heading>
              <Text textDecoration="underline" color="brand.500" size="md">
                {account?.email}
              </Text>
            </VStack>
            <Button size="sm">
              <EditIcon /> Edit Avatar
            </Button>
          </HStack>
        </VStack>
      </HStack>
      <Divider />
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2}>
          <TextField
            label="Profile Name"
            isReadOnly
            value={account?.displayName ?? ""}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <TextField
            label="Contact Number"
            isReadOnly
            value={user?.phoneNumber ?? ""}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <TextField label="Email" isReadOnly value={user?.email ?? ""} />
        </GridItem>
        <GridItem
          colSpan={2}
          display="flex"
          alignItems="flex-end"
          justifyContent={"flex-end"}
          pb="20px"
          gap={2}
        ></GridItem>
      </Grid>
    </Card>
  );
};
