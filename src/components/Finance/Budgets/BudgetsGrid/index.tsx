import { Pagination } from "@/elements";
import { BudgetItem, useGetBudgetsQuery } from "@/lib/API/finance-apis";
import { SimpleGrid, Box, HStack, Heading } from "@chakra-ui/react";
import { uniqueId } from "lodash";
import React, { Fragment, useEffect, useState } from "react";

const BudgetsGrid: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    const [total, setTotal] = useState<number>(0);
    const { data, isLoading, isFetching } = useGetBudgetsQuery(page);

    useEffect(() => {
        if (!isLoading && data?.counts) {
            setTotal(data.counts);
        }
    }, [isLoading]);

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

            <SimpleGrid columns={5} spacing={5} minChildWidth="250px" overflow="scroll" maxHeight={"500px"}>
                {!isLoading && !isFetching && data && data.budgets && data.budgets.length > 0 && (
                    <>
                        {data.budgets.map((budget: BudgetItem) => {
                            return (
                                <Box
                                    key={uniqueId()}
                                    bg="gray.700"
                                    rounded={"md"}
                                    height="80px"
                                    flexDirection={"row"}
                                    display="flex"
                                    justifyContent={"center"}
                                    alignItems="center"
                                >
                                    <Heading size={"sm"}>{budget.revision}</Heading>
                                </Box>
                            );
                        })}
                    </>
                )}
            </SimpleGrid>
        </Fragment>
    );
};
export default BudgetsGrid;
