import { AppConfig } from "@/config/app.config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CollectionBasedResponse, createReqHeaders } from ".";

export interface BudgetsResponse extends CollectionBasedResponse {
    budgets: BudgetItem[];
}
export type BudgetItem = {
    budget_id: string;
    revision: string;
};

export const FinanceApis = createApi({
    reducerPath: "financeApis",
    tagTypes: ["Budgets"],
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({ baseUrl: AppConfig.serviceHost + "/finance-service" }),
    endpoints: (builder) => ({
        getBudgets: builder.query<BudgetsResponse, number>({
            query: (page) => ({
                url: `budgets?page=${page}`,
                method: "GET",
                headers: createReqHeaders(),
            }),
            providesTags: ["Budgets"],
            transformResponse: (response: { data: BudgetsResponse }, meta, arg) => response.data,
        }),
    }),
});

export const { useGetBudgetsQuery } = FinanceApis;
