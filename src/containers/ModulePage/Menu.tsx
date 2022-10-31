import React, { useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { MenuItem } from ".";

export const Menu: React.FC<MenuItem> = (props) => {
    const { name, displayText, icon, goto } = props;

    const { pathname } = useLocation();
    const activeMenuTextColor = "brand.500";
    const activeMenuBg = "brandAlpha.200";

    const isActive = useMemo(() => {
        return pathname.toLowerCase().includes(name.toLowerCase());
    }, [pathname, name]);

    return (
        <Button
            as={RouterLink}
            to={goto}
            replace={window.location.pathname.includes(goto)}
            w="100%"
            variant={"ghost"}
            bg={isActive ? activeMenuBg : undefined}
            color={isActive ? activeMenuTextColor : "text-hard"}
            leftIcon={React.cloneElement(icon, { size: 16 })}
            justifyContent="start"
            _hover={{
                bg: isActive ? activeMenuBg : undefined,
                color: activeMenuTextColor,
            }}
            _active={{ bg: "transparent" }}
        >
            <Text ml="10px" fontWeight="medium">
                {displayText}
            </Text>
        </Button>
    );
};
