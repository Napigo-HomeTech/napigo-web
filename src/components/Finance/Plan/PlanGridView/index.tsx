import { PaginateGrid } from "@/elements/PaginateGrid";
import { fetchPlans } from "@/lib/Finance/finance-service-apis";
import { PlanSummary } from "@/types/finance.type";
import { Box } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";
import { PlanItem } from "./PlanItem";

export const PlanGridView: React.FC = () => {
    return (
        <PaginateGrid
            itemSkeleton={
                <Box width="100%" rounded="md" bg="gray.100" height="220px" />
            }
            amountOfSkeleton={9}
            itemPerPage={9}
            fetchResource={fetchPlans}
            itemComponent={(props: PlanSummary) => (
                <PlanItem key={uniqueId()} {...props} />
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
