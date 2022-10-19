import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { NapigoLogo as NavLogo } from "@/common/Logo";
import { UserMenu } from "@/components/Nav/UserMenu";
import { featureFlags } from "@/config/feature-flags";
import React from "react";
import { MdOutlineNotifications as NotifIcon, MdOutlineEmail as MessageIcon } from "react-icons/md";
import { Link } from "react-router-dom";
import { Box, HStack, IconButton, useColorModeValue } from "@chakra-ui/react";
import { SearchField } from "@/elements/Form";
import { getMessage } from "@/constant/datasets/fixtures";
import { ServiceMenu } from "./ServiceMenu";

export const Nav: React.FunctionComponent = () => {
    const background = useColorModeValue("base-bg", "whiteAlpha.50");
    const borderBottom = useColorModeValue("blackAlpha.50", "whiteAlpha.50");

    return (
        <Box
            as="nav"
            display="flex"
            position="sticky"
            top={0}
            zIndex="sticky"
            w="100vw"
            h="70px"
            bg={background}
            borderBottom="1px solid"
            borderColor={borderBottom}
            px="20px"
            backdropFilter="blur(8px)"
        >
            <Box display="flex" w="100%" flexDirection="row" alignItems="center" gap={4} justifyContent="space-between">
                <HStack gap={4} alignItems="center" w="100%">
                    <Link to="console" replace={window.location.pathname.includes("console")}>
                        <NavLogo />
                    </Link>
                    <IfFeatureEnabled feature={featureFlags.show_navbar_services_dropdown}>
                        <ServiceMenu />
                    </IfFeatureEnabled>
                    <Box display="flex" flexDirection="row" alignItems="center" maxWidth={"400px"} flex={1}>
                        <IfFeatureEnabled feature={featureFlags.enable_search_omnibar}>
                            <Box as="form" w="100%">
                                <SearchField
                                    autoComplete="off"
                                    spellCheck={false}
                                    placeholder={getMessage("navStrings", "search.placeholder")}
                                    bg="base-2-bg"
                                />
                            </Box>
                        </IfFeatureEnabled>
                    </Box>
                </HStack>

                <HStack alignItems="center" gap={0}>
                    <IfFeatureEnabled feature={featureFlags.show_navbar_notification_dropdown}>
                        <IconButton variant="ghost" aria-label="Notifications Drawer" color="icon-base-color" mx={0} icon={<NotifIcon size={23} />} />
                    </IfFeatureEnabled>
                    <IfFeatureEnabled feature={featureFlags.show_navbar_messages_dropdown}>
                        <IconButton variant="ghost" color="icon-base-color" aria-label="Messages Drawer" mx={0} icon={<MessageIcon size={23} />} />
                    </IfFeatureEnabled>
                    <UserMenu />
                </HStack>
            </Box>
        </Box>
    );
};
