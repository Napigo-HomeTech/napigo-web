import React, { Fragment, useEffect, useRef, useState } from "react";
import { CollectionBasedResponse } from "@/lib/Apis";
import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "lodash";
import { useIntersectionObserver } from "usehooks-ts";
import { SimpleGrid } from "@chakra-ui/react";
import { Skeleton } from "./Skeleton";

type InfiniteGridListProps = {
    itemSkeleton: React.ReactElement;
    fetch: any;
    amountOfSkeleton: number;
    itemComponent: (props: any) => React.ReactElement;
    limit?: number;
    item: any;
    columns: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    queryKey: string[];
    lastPageKey: string;
};
export const InfiniteGridList: React.FC<InfiniteGridListProps> = (props) => {
    const { itemComponent, amountOfSkeleton, itemSkeleton, limit, columns, fetch, item, queryKey, lastPageKey } = props;

    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { status, data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery<CollectionBasedResponse<typeof item>>([...queryKey], {
        queryFn: ({ pageParam = 1 }) => fetch(pageParam, limit),
        getNextPageParam: (lastPage, allPages) => {
            const maxPage = get(lastPage.data, lastPageKey);
            const nextPage = allPages.length + 1;
            return nextPage <= maxPage ? nextPage : undefined;
        },
        cacheTime: 0,
    });

    const entry = useIntersectionObserver(loadMoreRef, {});

    useEffect(() => {
        if (entry?.isIntersecting) {
            const position = window.scrollY;
            setScrollPosition(position);
            fetchNextPage();
        }
    }, [entry, fetchNextPage]);

    useEffect(() => {
        if (!isFetchingNextPage) {
            window.scrollTo(0, scrollPosition);
        }
    }, [isFetchingNextPage, scrollPosition]);

    return (
        <Fragment>
            <SimpleGrid columns={columns} spacing={5}>
                {status === "success" && (
                    <>
                        {data?.pages.map((page) => {
                            return page.data.results.map((val: typeof item) => {
                                return itemComponent(val);
                            });
                        })}
                    </>
                )}
                {status === "loading" && <Skeleton itemAmount={amountOfSkeleton} component={itemSkeleton} />}
            </SimpleGrid>
            <SimpleGrid columns={columns} mt="20px" spacing={5} ref={loadMoreRef} className={`${!hasNextPage ? "hidden" : ""}`}>
                <div />
                {isFetchingNextPage && <Skeleton itemAmount={amountOfSkeleton} component={itemSkeleton} />}
            </SimpleGrid>
        </Fragment>
    );
};
