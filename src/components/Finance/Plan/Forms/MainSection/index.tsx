import { Card } from "@/elements";
import { RootState } from "@/lib/Redux/store";
import { Grid, GridItem, Skeleton } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { ASMAmountDatafield } from "../ASMAmountDatafield";
import { ASMPercentDatafield } from "../ASMPercentDatafield";
import { COLDatafield } from "../COLDatafield";
import { ESMAmountDatafield } from "../ESMAmountDatafield";
import { ESMPercentDatafield } from "../ESMPercentDatafield";
import { NetIncomeDatafield } from "../NetIncomeDataField";

export const MainSection: React.FC = () => {
  const { isReady } = useSelector((state: RootState) => state.planformStore);

  if (!isReady) {
    return (
      <Skeleton
        width={"100%"}
        height="200px"
        rounded="md"
        startColor="gray.100"
        endColor="gray.200"
      />
    );
  }

  return (
    <Card width={"100%"} padding={0}>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(8, 1fr)">
        <GridItem
          colSpan={4}
          borderLeftWidth={1}
          borderLeftColor="transparent"
          padding={"20px"}
          display="flex"
          alignItems={"center"}
          flexDirection="row"
          gap={4}
        >
          <NetIncomeDatafield />
          <ESMPercentDatafield />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <ESMAmountDatafield />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <ASMPercentDatafield />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <ASMAmountDatafield />
        </GridItem>
        <GridItem colSpan={1} borderLeftWidth={1} borderLeftColor="border">
          <COLDatafield />
        </GridItem>
      </Grid>
    </Card>
  );
};
