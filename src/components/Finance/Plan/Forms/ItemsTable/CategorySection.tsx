import {
  AccordionItem,
  Heading,
  AccordionButton,
  AccordionIcon,
  IconButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { FaEllipsisV as MenuIcon } from "react-icons/fa";
import React, { Fragment } from "react";
import { TableForm } from "./TableForm";
import { Category } from "@/types/finance.type";

export const CategorySection: React.FC<Category> = ({ name, colorHex }) => {
  const onMenuClick = (ev: React.MouseEvent) => {
    ev.stopPropagation();
  };
  return (
    <Fragment>
      <AccordionItem
        marginBottom={"20px"}
        bg="gray.100"
        padding="0"
        rounded={"md"}
        borderWidth={1}
        borderColor="border"
      >
        <Heading
          flex="1"
          display={"flex"}
          flexDirection="row"
          alignItems={"center"}
          padding={2}
        >
          <AccordionButton _hover={{ bg: "transparent" }} gap={2}>
            <Box width="30px" height="30px" rounded={"full"} bg={colorHex} />
            <Box
              flex="1"
              display={"flex"}
              textAlign="left"
              flexDirection={"row"}
              alignItems="center"
              gap={2}
            >
              <Heading
                size="xs"
                color="text-hard"
                fontWeight={"bold"}
                paddingY={"5px"}
              >
                {name}
              </Heading>
              <AccordionIcon />
            </Box>
          </AccordionButton>
          <IconButton
            colorScheme={"base"}
            aria-label="menu"
            icon={<MenuIcon />}
            onClick={onMenuClick}
          />
        </Heading>
        <AccordionPanel pb={4} bg="card" rounded={"md"} borderTopRadius="0">
          <TableForm category={name} />
        </AccordionPanel>
      </AccordionItem>
    </Fragment>
  );
};
