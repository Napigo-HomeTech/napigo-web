import React, { useCallback, useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { MenuItem } from ".";

export const Menu: React.FC<MenuItem> = (props) => {
  const { name, displayText, icon, goto } = props;

  const { pathname } = useLocation();
  const activeMenuTextColor = "brand.500";
  const activeMenuBg = "blackAlpha.50";

  const isActive = useMemo(() => {
    return pathname.toLowerCase().includes(name.toLowerCase());
  }, [pathname, name]);

  const getOnActiveBorderProps = useCallback(() => {
    return {
      borderLeft: "solid",
      borderLeftColor: isActive ? "brand.500" : "transparent",
      borderLeftWidth: "5px",
    };
  }, [isActive]);

  return (
    <Button
      as={RouterLink}
      to={goto}
      replace={window.location.pathname.includes(goto)}
      w="100%"
      variant={"ghost"}
      rounded="none"
      {...getOnActiveBorderProps()}
      bg={isActive ? activeMenuBg : undefined}
      color={isActive ? activeMenuTextColor : "text-hard"}
      leftIcon={React.cloneElement(icon, { size: 16 })}
      justifyContent="start"
      _hover={{
        bg: isActive ? activeMenuBg : "blackAlpha.50",
        color: isActive ? activeMenuTextColor : "text-hard",
      }}
      _active={{ bg: "transparent" }}
    >
      <Text ml="0px" fontWeight="medium">
        {displayText}
      </Text>
    </Button>
  );
};
