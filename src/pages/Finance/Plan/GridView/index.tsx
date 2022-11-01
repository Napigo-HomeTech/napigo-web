import { PlanBanner } from "@/components/Finance/Plan/PlanBanner";
import { fixtures } from "@/constant/datasets/fixtures";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import PlanBannerCalculator from "@/assets/images/plan-banner-calculator.svg";
import PlanBannerCoins from "@/assets/images/plan-banner-coins.svg";

import React from "react";

export const GridView: React.FC = () => {
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
        </VStack>
    );
};