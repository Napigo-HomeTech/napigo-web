import { fetchPlanById, updatePlan } from "@/lib/Finance/finance-service-apis";
import {
  PlanformActions,
  PlanformStoreState,
} from "@/lib/Redux/planform.reducer";
import { store } from "@/lib/Redux/store";
import {
  ASMHealthStatus,
  Category,
  PlanForm,
  PlanFormUpdateRequest,
  PlanItem,
} from "@/types/finance.type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

let _updaterInterval: any = null;

export const PlanformManager: React.FC = () => {
  const { plan_id } = useParams();
  const dispatch = useDispatch();

  const { data: response, isLoading } = useQuery(["plan"], {
    queryFn: () => fetchPlanById(plan_id as string),
    cacheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    return () => {
      /**
       * @Responsibility unmounted:  means user is leaving the form,
       * this useEffect will make sure that all the form component status
       * to be fallback to default value and set status to not ready..
       */
      /**
       * At this point, we had a signal that user is leaving the form,
       * so let's do the cleanup and reset the form states
       */
      dispatch(PlanformActions.resetPlanformDefaultState());
    };
  }, [dispatch]);

  useEffect(() => {
    /**
     * @Responsibility watch over the data being fetch via the useQuery,
     * once data is available, will do setup on the redux form
     */
    if (!isLoading && response) {
      /**
       * At this point, data should be already available to start doing the redux setup
       */
      const payload: PlanForm = response.data;
      dispatch(PlanformActions.loadData(payload));
      dispatch(PlanformActions.setLoadingError(null));
      dispatch(PlanformActions.planFormIsReady(true));
    }
  }, [isLoading, response, dispatch]);

  useEffect(() => {
    /**
     * @ONWATCH
     * This interval is doing some async operations and will take sometimes
     * for it to be done, while, doing the work, there are possibility that the interval
     * will fire anthor async operation in the background.. thus the function beloww
     * may run in "parallel" somehow..please watch over any unexpected side effects
     * or data out of sync , race condition etc... fix or refactor if needed
     */
    _updaterInterval = setInterval(async () => {
      const payload: PlanformStoreState = store.getState().planformStore;

      /**
       * For wadever reason, the omit didnt not remove the omit key value pair,
       * so must be delete manually
       */

      if (payload.eventCounts === 0) {
        return;
      }

      dispatch(PlanformActions.resetEventCounts());
      dispatch(PlanformActions.planFormOnSaving(true));

      const plan: PlanFormUpdateRequest = {
        _id: payload._id as string,
        title: payload.title as string,
        net_income: payload.net_income as string,
        asm_percent: payload.asm_percent as number,
        asm_amount: payload.asm_amount as string,
        esm_percent: payload.esm_percent as number,
        esm_amount: payload.esm_amount as string,
        col: payload.col as string,
        categories: payload.categories as Category[],
        health_status: payload.health_status as ASMHealthStatus,
        items: payload.items as PlanItem[],
      };

      await updatePlan(plan);

      dispatch(PlanformActions.planFormOnSaving(false));
      dispatch(PlanformActions.resetEventCounts());
    }, 1000);

    return () => {
      if (_updaterInterval !== null) {
        clearInterval(_updaterInterval);
      }
    };
  }, [dispatch, plan_id]);
  return null;
};
