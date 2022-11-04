import { CollectionBasedResponse } from "@/lib/Apis";
import { PlanSummary } from "@/types/finance.type";
import { HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "lodash";
import React, { useEffect } from "react";
import { Pagination } from "../Pagination";
import { Skeleton } from "./Skeleton";

type PaginateGridProps = {
    itemSkeleton: React.ReactElement;
    amountOfSkeleton?: number;
    fetchResource: any;
    itemPerPage: number;
    itemComponent: (props: any) => React.ReactElement;
    columns: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    queryKey: string[];
    lastPageKey: string;
};

export const PaginateGrid: React.FC<PaginateGridProps> = (props) => {
    const {
        itemSkeleton,
        fetchResource,
        amountOfSkeleton = 6,
        itemPerPage,
        itemComponent,
        columns,
        queryKey,
        lastPageKey,
    } = props;

    const [page, setPage] = React.useState(1);

    const queryClient = useQueryClient();

    const {
        data: response,
        status,
        isFetching,
        error,
    } = useQuery<CollectionBasedResponse<any>>([...queryKey, page], {
        queryFn: () => fetchResource(page, itemPerPage),
        keepPreviousData: true,
        staleTime: 60000,
        cacheTime: 5000,
    });

    useEffect(() => {
        if (error && error instanceof Error) {
            throw new Error(error.message);
        }
    }, [error]);

    useEffect(() => {
        const maxPage = get(response?.data, lastPageKey);
        if (response && maxPage && page < maxPage) {
            queryClient.prefetchQuery([...queryKey, page + 1], () =>
                fetchResource(page + 1, itemPerPage)
            );
        }
    }, [
        fetchResource,
        itemPerPage,
        lastPageKey,
        page,
        queryClient,
        queryKey,
        response,
    ]);

    return (
        <VStack width={"100%"}>
            <HStack width="inherit" justifyContent="flex-end">
                <Pagination
                    totalCounts={1000}
                    countPerPage={20}
                    onPageChange={(page: number) => {
                        setPage(page);
                    }}
                />
            </HStack>
            <SimpleGrid columns={columns} spacing={5} width="inherit">
                {status === "success" && !isFetching && (
                    <>
                        {response.data.results.map((val: PlanSummary) =>
                            itemComponent(val)
                        )}
                    </>
                )}
                {isFetching && (
                    <Skeleton
                        itemAmount={amountOfSkeleton}
                        component={itemSkeleton}
                    />
                )}
            </SimpleGrid>
        </VStack>
    );
};
