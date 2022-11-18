import { fixtures } from "@/constant/datasets/fixtures";
import { PaginateGrid } from "@/elements/PaginateGrid";
import { fetchPlans } from "@/lib/Finance/finance-service-apis";
import { PlanSummary } from "@/types/finance.type";
import { HStack, Skeleton, Text } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";
import { PlanGridCard } from "../PlanGridCard";

export const PlanListing: React.FC = () => {
  return (
    <PaginateGrid
      emptyPlaceholder={
        <HStack
          width="100%"
          maxHeight="500px"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="text-gray" fontWeight="normal">
            {fixtures.financeStrings["finance.plan.gridview.no-result.text"]}
          </Text>
        </HStack>
      }
      itemSkeleton={
        <Skeleton
          width={"100%"}
          height="220px"
          rounded="md"
          startColor="gray.100"
          endColor="gray.200"
        />
      }
      amountOfSkeleton={9}
      itemPerPage={9}
      fetchResource={fetchPlans}
      itemComponent={(props: PlanSummary) => (
        <PlanGridCard key={uniqueId()} {...props} />
      )}
      columns={{
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
      }}
      queryKey={["plans"]}
      lastPageKey="lastPage"
    />
  );
};
