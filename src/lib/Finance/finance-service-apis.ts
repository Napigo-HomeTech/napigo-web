import { PlanSummary } from "@/types/finance.type";
import { CollectionBasedResponse, get } from "@/lib/Apis";

/**
 *
 * @returns
 */
const fetchPlans = async (
    page: number,
    limit: number
): Promise<CollectionBasedResponse<PlanSummary>> => {
    const response = await get(
        `/finance-service/plans?limit=${limit}&page=${page}`
    );
    return response.data;
};

export { fetchPlans };
