import { Pagination } from "@/elements";
import { BudgetItem, useGetBudgetsQuery } from "@/lib/Apis/finance-apis";
import { SimpleGrid, HStack } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { BudgetsLoader } from "./BudgetsLoader";
import { BudgetThumbnail } from "./BudgetThumbnail";

const BudgetsGrid: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    const [total, setTotal] = useState<number>(0);
    const { data, isLoading, isFetching } = useGetBudgetsQuery(page);

    useEffect(() => {
        if (!isLoading && data?.counts) {
            setTotal(data.counts);
        }
    }, [isLoading, data]);

    const isDataReady = Boolean(
        !isLoading &&
            !isFetching &&
            data &&
            data.budgets &&
            data.budgets.length > 0
    );

    return (
        <Fragment>
            <HStack width={"100%"} height="50px" justifyContent={"flex-end"}>
                <Pagination
                    countPerPage={20}
                    totalCounts={total}
                    onPageChange={(page: number) => {
                        setPage(page);
                    }}
                />
            </HStack>

            <SimpleGrid
                columns={5}
                spacing={5}
                minChildWidth="250px"
                overflow="scroll"
                maxHeight={"500px"}
            >
                {isDataReady && (
                    <>
                        {data?.budgets.map((budget: BudgetItem) => (
                            <BudgetThumbnail key={uniqueId()} {...budget} />
                        ))}
                    </>
                )}
                {!isDataReady && <BudgetsLoader />}
            </SimpleGrid>
        </Fragment>
    );
};
export default BudgetsGrid;
