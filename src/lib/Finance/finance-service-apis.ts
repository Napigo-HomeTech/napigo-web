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
  const response = await get(
    `/finance-service/plans?limit=${limit}&page=${page}`
  );
  return response.data;
};

/**
 *@returns { plan_id: string }
 */
const createPlan = async (): Promise<BasedResponse<PlanIdResponse>> => {
  const response = await post(`/finance-service/plans`);
  return response.data;
};

export { fetchPlans, createPlan };
