import { PlanIdResponse, PlanSummary } from "@/types/finance.type";
import { BasedResponse, CollectionBasedResponse, get, post } from "@/lib/Apis";

/**
 *
 * @returns
 */
const fetchPlans = async (
  page: number,
  limit: number
): Promise<CollectionBasedResponse<PlanSummary>> => {
  const response = await get({
    url: `/finance-service/plans?limit=${limit}&page=${page}`,
    withAuth: true,
  });
  return response.data;
};

/**
 *@returns { plan_id: string }
 */
const createPlan = async (): Promise<BasedResponse<PlanIdResponse>> => {
  const response = await post({
    url: `/finance-service/plans`,
    withAuth: true,
  });
  return response.data;
};

export { fetchPlans, createPlan };
