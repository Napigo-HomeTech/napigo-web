import { fixtures } from "@/constant/datasets/fixtures";
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
} from "@chakra-ui/react";
import React from "react";

export const PersonalInfoCardForm: React.FC = () => {
    const account = useAccount();
    const user = getUser();
    return (
        <Card width={"100%"}>
            <HStack width="inherit">
                <VStack alignItems={"flex-start"} width="inherit">
                    <Heading
                        size="sm"
                        fontWeight={"semibold"}
                        color="text-soft"
                    >
                        {
                            fixtures.profileStrings[
                                "personal-profile.personal-information.avatar.label"
                            ]
                        }
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
                            <Heading
                                size="sm"
                                py={0}
                                lineHeight={0.5}
                                color="text-hard"
                            >
                                {account?.displayName}
                            </Heading>
                            <Text
                                textDecoration="underline"
                                color="text-gray"
                                size="md"
                            >
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
                templateRows="repeat(1, 1fr)"
                templateColumns="1fr 1fr"
                gap={4}
                paddingBottom={0}
            >
                <TextField
                    label="Profile Name"
                    isReadOnly
                    value={account?.displayName ?? ""}
                />
                <TextField
                    label="Profile Name"
                    isReadOnly
                    value={account?.displayName ?? ""}
                />
            </Grid>
        </Card>
    );
};
