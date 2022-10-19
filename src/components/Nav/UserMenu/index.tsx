import { IfFeatureEnabled } from "@growthbook/growthbook-react";
import { featureFlags } from "@/config/feature-flags";
import { isEmpty, truncate } from "lodash";
import { useAccount } from "@/lib/Accounts/useAccount";
import { useHandleLogoutMethod } from "@/lib/Auth";
import React, { useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    IconButton,
    HStack,
    VStack,
    Text,
    Link,
    Heading,
    Divider,
    MenuItem,
    useColorModeValue,
} from "@chakra-ui/react";
import { MdAccountCircle as ProfileIcon, MdLaunch as AccountSettingIcon, MdGroup as MembersIcon, MdLogout as LogoutIcon } from "react-icons/md";
import { SmallAddIcon } from "@chakra-ui/icons";
import { getMessage } from "@/constant/datasets/fixtures";

const MenuIconSize = 20;

export const UserMenu: React.FC = () => {
    const account = useAccount();

    const emailColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

    const { handleLogout } = useHandleLogoutMethod();

    const NameHeader = useCallback(() => {
        return isEmpty(account?.displayName) ? (
            <Link as={RouterLink} to="add-name" color="brand.500">
                <SmallAddIcon />
                Add username
            </Link>
        ) : (
            <Heading size={"sm"}>{account?.displayName}</Heading>
        );
    }, [account?.displayName]);

    return (
        <Menu>
            <>
                <MenuButton
                    as={IconButton}
                    variant="ghost"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    _active={{ bg: "transparent" }}
                    _focus={{ bg: "transparent" }}
                >
                    <Avatar size={"sm"} name={account?.displayName ?? account?.email} src={account?.photo_url ?? ""} />
                </MenuButton>
                <MenuList w="270px">
                    <MenuGroup title={getMessage("navStrings", "usermenu.dropdown.title")}>
                        <HStack p={"10px"}>
                            <Avatar name={account?.displayName ?? account?.email} src={account?.photo_url ?? ""} />
                            <VStack justifyContent={"start"} alignItems="start">
                                <NameHeader />
                                <Text fontSize="sm" color={emailColor}>
                                    {truncate(account?.email ?? "", { length: 26 })}
                                </Text>
                            </VStack>
                        </HStack>
                    </MenuGroup>
                    <Divider orientation="horizontal" />
                    <IfFeatureEnabled feature={featureFlags.enable_module_account_setting}>
                        <MenuItem
                            as={RouterLink}
                            to="settings/general"
                            replace={window.location.pathname.includes("settings/general")}
                            icon={<AccountSettingIcon size={MenuIconSize} />}
                        >
                            {getMessage("navStrings", "usermenu.dropdown.item.setting.linktext")}
                        </MenuItem>
                    </IfFeatureEnabled>

                    <IfFeatureEnabled feature={featureFlags.enable_module_profile}>
                        <MenuItem
                            as={RouterLink}
                            to="profile"
                            replace={window.location.pathname.includes("profile")}
                            icon={<ProfileIcon size={MenuIconSize} />}
                        >
                            {getMessage("navStrings", "usermenu.dropdown.item.profile.linktext")}
                        </MenuItem>
                    </IfFeatureEnabled>

                    <IfFeatureEnabled feature={featureFlags.enable_module_members}>
                        <MenuItem
                            as={RouterLink}
                            to="members"
                            replace={window.location.pathname.includes("members")}
                            icon={<MembersIcon size={MenuIconSize} />}
                        >
                            {getMessage("navStrings", "usermenu.dropdown.item.members.linktext")}
                        </MenuItem>
                    </IfFeatureEnabled>

                    <Divider orientation="horizontal" />
                    <MenuItem icon={<LogoutIcon size={MenuIconSize} />} onClick={handleLogout}>
                        {getMessage("navStrings", "usermenu.dropdown.item.logout.linktext")}
                    </MenuItem>
                </MenuList>
            </>
        </Menu>
    );
};
