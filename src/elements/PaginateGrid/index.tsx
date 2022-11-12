import { CollectionBasedResponse } from "@/lib/Apis";
import { PlanSummary } from "@/types/finance.type";
import { HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "lodash";
import React, { useEffect, useMemo } from "react";
import { Pagination } from "../Pagination";
import { Skeleton } from "./Skeleton";

type PaginateGridProps = {
  itemSkeleton: React.ReactElement;
  emptyPlaceholder: React.ReactElement;
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

export const PaginateGrid: React.FC<PaginateGridProps> = ({
  itemSkeleton,
  emptyPlaceholder,
  fetchResource,
  amountOfSkeleton = 6,
  itemPerPage,
  itemComponent,
  columns,
  queryKey,
  lastPageKey,
}) => {
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
    staleTime: 0,
    cacheTime: 0,
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

  const noResult = useMemo(() => {
    return response?.data.results.length === 0;
  }, [response?.data.results.length]);

  return (
    <VStack width={"100%"}>
      <HStack width="inherit" justifyContent="flex-end">
        {!noResult && (
          <Pagination
            totalCount={response?.data.total_count ?? 0}
            countPerPage={itemPerPage}
            onPageChange={(page: number) => {
              setPage(page);
            }}
          />
        )}
      </HStack>
      {isFetching ? (
        <SimpleGrid columns={columns} spacing={5} width="inherit">
          <Skeleton itemAmount={amountOfSkeleton} component={itemSkeleton} />
        </SimpleGrid>
      ) : (
        <>
          {status === "success" && noResult && <>{emptyPlaceholder}</>}
          {status === "success" && !noResult && (
            <SimpleGrid columns={columns} spacing={5} width="inherit">
              {status === "success" && !isFetching && !noResult && (
                <>
                  {response.data.results.map((val: PlanSummary) =>
                    itemComponent(val)
                  )}
                </>
              )}
            </SimpleGrid>
          )}
        </>
      )}
    </VStack>
  );
};
