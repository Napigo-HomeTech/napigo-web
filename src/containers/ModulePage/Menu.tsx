import React, { useMemo } from "react";
import { Button } from "@chakra-ui/react";
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
      color={isActive ? activeMenuTextColor : undefined}
      leftIcon={React.cloneElement(icon, { size: 20 })}
      justifyContent="start"
      _hover={{
        bg: isActive ? activeMenuBg : undefined,
        color: activeMenuTextColor,
      }}
      _active={{ bg: "transparent" }}
    >
      {displayText}
    </Button>
  );
};
