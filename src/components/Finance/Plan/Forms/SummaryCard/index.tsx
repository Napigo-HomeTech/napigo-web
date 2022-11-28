import { fixtures } from "@/constant/datasets/fixtures";
import { Card } from "@/elements";
import { RootState } from "@/lib/Redux/store";
import { Category } from "@/types/finance.type";
import { Box, Heading, List, ListItem, Text, VStack } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

export const SummaryCard: React.FC = () => {
  const { categories, isReady } = useSelector(
    (state: RootState) => state.planformStore
  );

  if (!isReady) {
    return null;
  }
  return (
    <Card>
      <VStack width="100%" alignItems={"flex-start"}>
        <Heading size="sm">
          {fixtures.financeStrings["finance.planform.summarycard.header"]}
        </Heading>
        <List width={"100%"}>
          {categories?.map((item: Category) => (
            <ListItem
              key={uniqueId()}
              width="inherit"
              marginY="20px"
              flexDirection={"row"}
              display="flex"
              alignItems={"center"}
              gap={2}
            >
              <Box
                height="10px"
                width="10px"
                rounded={"full"}
                bg={item.colorHex}
              />
              <Text fontSize="14px">{item.name}</Text>
              <Text fontSize={"14px"} fontWeight="bold" marginLeft={"auto"}>
                {/* @TODO */}
                $0.00
              </Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Card>
  );
};
