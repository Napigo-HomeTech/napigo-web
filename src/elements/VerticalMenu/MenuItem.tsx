import { useColorModeValue, Button } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

export type MenuItemProps = {
  name: string;
  displayText: string;
  icon?: React.ReactElement;
  to: string;
};
export const MenuItem: React.FC<MenuItemProps> = ({
  name,
  displayText,
  icon,
  to,
}) => {
  const { pathname } = useLocation();
  const activeMenuColor = useColorModeValue("brand.500", "brand.500");
  const activeMenuBg = useColorModeValue("brandAlpha.200", "brandAlpha.200");

  const isActive = useMemo(() => {
    return pathname.toLowerCase().includes(name.toLowerCase());
  }, [pathname, name]);

  return (
    <Button
      as={RouterLink}
      to={to}
      replace={window.location.pathname.includes(to)}
      w="100%"
      variant="ghost"
      bg={isActive ? activeMenuBg : undefined}
      borderWidth={0}
      color={isActive ? activeMenuColor : undefined}
      leftIcon={icon}
      justifyContent="start"
      _hover={{
        bg: isActive ? activeMenuBg : undefined,
        color: activeMenuColor,
      }}
      _active={{ bg: "transparent" }}
    >
      {displayText}
    </Button>
  );
};
