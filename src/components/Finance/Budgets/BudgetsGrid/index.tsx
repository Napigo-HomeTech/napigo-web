import { FinanceApis, useGetBudgetsQuery } from "@/lib/API/finance-apis";
import React, { useState } from "react";

const BudgetsGrid: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const { data, isError, isLoading } = useGetBudgetsQuery(1, { skip: true });

    return <h1>hello There</h1>;
};

export default BudgetsGrid;
