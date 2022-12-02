import {
  AccordionItem,
  Heading,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { TableForm } from "./TableForm";
import { Category } from "@/types/finance.type";
import { CategoryMenu } from "./CategoryMenu";
import { CategoryControls } from "./CategoryControls";

export const CategorySection: React.FC<Category> = ({
  categ_id,
  name,
  colorHex,
}) => {
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
          <CategoryControls categId={categ_id} />
          {name !== "UN-ASSIGNED" && (
            <CategoryMenu category={{ categ_id, name, colorHex }} />
          )}
        </Heading>
        <AccordionPanel pb={4} bg="card" rounded={"md"} borderTopRadius="0">
          <TableForm category={{ categ_id, name, colorHex }} />
        </AccordionPanel>
      </AccordionItem>
    </Fragment>
  );
};
