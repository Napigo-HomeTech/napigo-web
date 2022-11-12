import React from "react";
import { PlanBanner } from "@/components/Finance/Plan/PlanBanner";
import { fixtures } from "@/constant/datasets/fixtures";
import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import PlanBannerCalculator from "@/assets/images/plan-banner-calculator.svg";
import PlanBannerCoins from "@/assets/images/plan-banner-coins.svg";
import { PlansViewControl } from "@/components/Finance/Plan/PlansViewControl";
import { PlanGridView } from "@/components/Finance/Plan/PlanGridView";

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
        imageLeftSrc={PlanBannerCalculator}
        imageRightSrc={PlanBannerCoins}
        buttonText="Do it now!!"
      />
      <PlansViewControl />
      <Box width="100%">
        <PlanGridView />
      </Box>
    </VStack>
  );
};
