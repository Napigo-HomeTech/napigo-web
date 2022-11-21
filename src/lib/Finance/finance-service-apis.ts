import {
  PlanForm,
  PlanFormUpdateRequest,
  PlanIdResponse,
  PlanSummary,
} from "@/types/finance.type";
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
 * @New version endpoint for updating plan form
 * @param payload
 * @returns
 */
const updatePlan = async (
  payload: PlanFormUpdateRequest
): Promise<BasedResponse<{ _id: string }>> => {
  const response = await put({
    url: "/finance-service/plans",
    body: payload,
    withAuth: true,
  });

  return response.data;
};

/**
 * @deprecated
 * @param plan_id
 * @param datafield_name
 * @param datafield_type
 * @param datafield_value
 * @returns
 */
const updatePlanDatafield = async (
  plan_id: string,
  datafield_name: string,
  datafield_type: string,
  datafield_value: any
): Promise<BasedResponse<{ _id: string }>> => {
  const response = await put({
    url: `/finance-service/plans/datafield`,
    body: {
      plan_id,
      datafield_name,
      datafield_type,
      datafield_value,
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

export {
  fetchPlans,
  createPlan,
  fetchPlanById,
  updatePlan,
  updatePlanDatafield,
  deletePlan,
};
