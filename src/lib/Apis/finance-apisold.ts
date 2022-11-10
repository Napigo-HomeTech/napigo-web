import { AppConfig } from "@/config/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CollectionBasedResponse } from ".";

export type BudgetItem = {
    budget_id: string;
    revision: string;
};

export const FinanceApis = createApi({
    reducerPath: "financeApis",
    tagTypes: ["Budgets"],
    keepUnusedDataFor: 30,
    baseQuery: fetchBaseQuery({
        baseUrl: AppConfig.serviceHost + "/finance-service",
    }),
    endpoints: (builder) => ({
        /**
         *
         */
        getBudgets: builder.query<CollectionBasedResponse<BudgetItem>, number>({
            query: (page) => ({
                url: `budgets?page=${page}`,
                method: "GET",
                headers: {},
            }),
            providesTags: ["Budgets"],
            transformResponse: (
                response: { data: CollectionBasedResponse<BudgetItem> },
                _
            ) => response.data,
        }),
    }),
});

export const { useGetBudgetsQuery } = FinanceApis;
