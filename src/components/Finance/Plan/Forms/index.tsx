import { Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { PlanTitle } from "./PlanTitle";
import { SavingIndicator } from "./SavingIndicator";
import { MainSection } from "./MainSection";
import { PlanformManager } from "./PlanformManager";
import { TopRightControl } from "./TopRightControl";
import { TableControlPanel } from "./TableControlPanel";
import { SummaryCard } from "./SummaryCard";
import { ItemsTable } from "./ItemsTable";
import { PlanFormExit } from "./PlanFormExit";

export const PlanFormContainer: React.FC = () => {
  return (
    <Fragment>
      <PlanFormExit />
      <PlanformManager />
      <VStack width={"inherit"} gap={2}>
        <HStack
          width={"inherit"}
          gap={0}
          justifyContent={"space-between"}
          maxHeight={"70px"}
        >
          <HStack>
            <PlanTitle />
            <SavingIndicator />
          </HStack>
          <TopRightControl />
        </HStack>
        <MainSection />
        <TableControlPanel />

        <Grid
          width={"100%"}
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(8, 1fr)"
        >
          <GridItem
            colSpan={5}
            display="flex"
            alignItems={"flex-start"}
            flexDirection="row"
          >
            <ItemsTable />
          </GridItem>
          <GridItem colSpan={3}>
            <SummaryCard />
          </GridItem>
        </Grid>
      </VStack>
    </Fragment>
  );
};
