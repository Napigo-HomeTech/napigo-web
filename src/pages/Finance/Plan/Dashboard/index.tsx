import React from "react";
import { PlanBanner } from "@/components/Finance/Plan/PlanBanner";
import { fixtures } from "@/constant/datasets/fixtures";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { PlanListingControls as PlanListingControlPanelForm } from "@/components/Finance/Plan/PlanListingControls";
import { PlanListing } from "@/components/Finance/Plan/PlanListing";

export const PlanDashboard: React.FC = () => {
  return (
    <VStack width={"100%"} gap={2} p="20px">
      <HStack w="inherit" justifyContent={"space-between"}>
        <Heading size="lg" fontWeight={"normal"} color="heading">
          {fixtures.financeStrings["finance.page.plan.title"]}
        </Heading>
      </HStack>
      <PlanBanner
        title={fixtures.financeStrings["finance.plan.banner.title"]}
        buttonText="Find out more"
      />
      <PlanListingControlPanelForm />
      <PlanListing />
    </VStack>
  );
};
