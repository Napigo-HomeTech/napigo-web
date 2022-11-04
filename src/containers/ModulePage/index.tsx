import {
    Box,
    Divider,
    Heading,
    HStack,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";

export type MenuItem = {
    /**
     * Supply the icon as React Element which you want to display for this item
     * you may include styling to the icon too, if not will use default styling
     */
    icon: React.ReactElement;
    /**
     * This is the key identifier for each item, which used to indicate
     * active item
     */
    name: string;
    /**
     * The text to display in the Item Box
     */
    displayText: string;
    /**
     * Link when user click on the item, Each item use
     * RouterLink
     */
    goto: string;
};
type ModulePageProps = {
    menus: MenuItem[];
    /**
     * Provide your your background if required, will override
     * the default which "inherit". Do take note that you have to create your
     * own logic call before sending the value here for dark mode | light toggle
     */
    contentBackground?: string;
    /**
     * The text that will be display in the page title section,
     * on top of the left drawer menu
     */
    title?: string;
};

export const ModulePage: React.FC<ModulePageProps> = (props) => {
    const { menus, contentBackground, title } = props;
    const drawerBorder = useColorModeValue("blackAlpha.50", "whiteAlpha.50");

    return (
        <HStack
            spacing={0}
            display={"flex"}
            flexDirection={"row"}
            alignItems="start"
            justifyContent={"flex-start"}
            w="100vw"
            bg={contentBackground}
        >
            <Box
                width="250px"
                top="70px"
                position={"sticky"}
                left={0}
                margin={0}
                minHeight={"calc(100vh - 70px)"}
                height="auto"
                borderRightWidth={"0.5px"}
                borderColor={drawerBorder}
                bg={"card"}
            >
                {title && (
                    <VStack
                        width="full"
                        p="20px"
                        paddingBottom={0}
                        margin={0}
                        alignItems="flex-start"
                        justifyContent="start"
                    >
                        <Heading
                            size="md"
                            fontWeight="bold"
                            letterSpacing={"wide"}
                            color="heading"
                        >
                            {title}
                        </Heading>
                        <Divider />
                    </VStack>
                )}
                <VStack py="30px" px="0px">
                    {menus.map((item: MenuItem) => (
                        <Menu key={uniqueId()} {...item} />
                    ))}
                </VStack>
            </Box>
            <Box
                flex={1}
                margin={0}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems={"center"}
            >
                <Outlet />
            </Box>
        </HStack>
    );
};
