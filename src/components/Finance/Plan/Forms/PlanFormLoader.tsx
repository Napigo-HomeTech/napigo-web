import { usePrompt } from "@/elements/Prompt";
import { fetchPlanById } from "@/lib/Finance/finance-service-apis";
import { actions } from "@/lib/Redux/plan-form-reducer";
import { RootState, store } from "@/lib/Redux/store";
import { EnumPlanStatus, PlanForm } from "@/types/finance.type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/**
 * This component will help to load the initial data for the plan, upload and setup data
 * into the redux..once everything is ready, will start to render each and every plan form component.
 * This is to make sure that each part of the form's redux store is ready to be use before we render the
 * UI component and start to use whatever value set from the redux store to dislay
 * @param param0
 * @returns
 */
export const PlanFormLoader: React.FC = () => {
  const { plan_id } = useParams();

  const dispatch = useDispatch();
  const { count, onSaving } = useSelector((state: RootState) => ({
    count: state.plan_eventCountStore.count,
    onSaving: state.plan_onSavingStore.onSaving,
  }));

  const { data: response, isLoading } = useQuery(["plan"], {
    queryFn: () => fetchPlanById(plan_id as string),
    cacheTime: 0,
    staleTime: 0,
  });

  usePrompt({
    header: "Are you sure you want to leave ?",
    message: "Changes that you made may not be saved",
    when: count > 0 || onSaving,
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

      dispatch(actions.updateTitle(""));
      dispatch(actions.titleIsReady(false));

      /**
       * @Step 1
       */
      const payload: PlanForm = {
        _id: "",
        owner_id: "",
        title: store.getState().plan_titleStore.title,
        net_income: 0,
        esm_percent: 0,
        esm_amount: 0,
        asm_percent: 0,
        asm_amount: 0,
        col: 0,
        created_at: "",
        updated_at: null,
        deleted: 0,
        status: EnumPlanStatus.draft,
        active_on: null,
        health_status: "DANGER",
        items: [],
      };

      window.localStorage.setItem(
        "cache_planform_temp",
        JSON.stringify(payload)
      );
    };
  }, [dispatch, response?.data]);

  useEffect(() => {
    /**
     * @Responsibility watch over the data being fetch via the useQuery,
     * once data is available, will do setup on the redux form
     */
    if (!isLoading && response) {
      /**
       * At this point, data should be already available to start doing the redux setup
       */
      /**
       * ----------------------------------------------------------
       * @ Setting up the Title Component
       * ---------------------------------------------------------*/
      const { title } = response.data;
      setTimeout(() => {
        dispatch(actions.updateTitle(title));
        dispatch(actions.titleIsReady(true));
      }, 1000);
    }
  }, [isLoading, response, dispatch]);

  return null;
};
