import { PlanForm, PlanIdResponse, PlanSummary } from "@/types/finance.type";
import {
  BasedResponse,
  CollectionBasedResponse,
  get,
  post,
  put,
  remove,
} from "@/lib/Apis";

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
 *
 * @param plan_id
 */
const fetchPlanById = async (
  plan_id: string
): Promise<BasedResponse<PlanForm>> => {
  const response = await get({
    url: `/finance-service/plans/${plan_id}`,
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

/**
 *
 * @param plan_id
 * @param title
 * @returns
 */
const updatePlanTitle = async (
  plan_id: string,
  title: string
): Promise<BasedResponse<{ _id: string }>> => {
  const response = await put({
    url: `/finance-service/plans/title`,
    body: {
      plan_id,
      title,
    },
    withAuth: true,
  });

  return response.data;
};

/**
 *
 * @param plan_id
 */
const deletePlan = async (
  plan_id: string
): Promise<BasedResponse<{ _id: string }>> => {
  const response = await remove({
    url: `/finance-service/plans/${plan_id}`,
    withAuth: true,
  });
  return response.data;
};

export { fetchPlans, createPlan, fetchPlanById, updatePlanTitle, deletePlan };
