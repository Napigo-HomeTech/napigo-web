import { usePrompt } from "@/elements/Prompt";
import { RootState } from "@/lib/Redux/store";
import { Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { PlanTitle } from "./PlanTitle";
import { SavingIndicator } from "./SavingIndicator";
import { MainSection } from "./MainSection";
import { PlanformManager } from "./PlanformManager";
import { TopRightControl } from "./TopRightControl";
import { TableControlPanel } from "./TableControlPanel";
import { SummaryCard } from "./SummaryCard";
import { ItemsTable } from "./ItemsTable";

export const PlanForm: React.FC = () => {
  const { eventCounts, onSaving } = useSelector(
    (state: RootState) => state.planformStore
  );

  usePrompt({
    header: "Are you sure you want to leave ?",
    message: "Changes that you made may not be saved",
    when: eventCounts > 0 || onSaving,
  });

  return (
    <Fragment>
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
