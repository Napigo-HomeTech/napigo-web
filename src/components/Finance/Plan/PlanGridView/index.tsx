import { Card } from "@/elements";
import { InfiniteGridList } from "@/elements/InfiniteGrid";
import { fetchPlans } from "@/lib/Finance/finance-service-apis";
import { PlanSummary } from "@/types/finance.type";
import { Box } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React from "react";

export const PlanGridView: React.FC = () => {
    return (
        <InfiniteGridList
            itemSkeleton={<Box width="100%" rounded="md" bg="gray.100" height="220px" />}
            amountOfSkeleton={20}
            limit={20}
            fetch={fetchPlans}
            item={{
                imageUrl: "string",
            }}
            itemComponent={(props: PlanSummary) => (
                <Card key={uniqueId()} width="100%" borderColor={"border"} borderWidth={1} p="10px" height="220px" rounded="md">
                    {props.col}
                    {props.title}
                </Card>
            )}
            columns={{
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
            }}
            queryKey={["plans"]}
            lastPageKey="lastPage"
        />
    );
};
