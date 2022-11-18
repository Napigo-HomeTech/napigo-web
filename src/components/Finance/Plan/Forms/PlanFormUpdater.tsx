import { updatePlanTitle } from "@/lib/Finance/finance-service-apis";
import { actions } from "@/lib/Redux/plan-form-reducer";
import { store } from "@/lib/Redux/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

let _updaterInterval: any = null;

export const PlanFormUpdater: React.FC = () => {
  const dispatch = useDispatch();
  const { plan_id } = useParams();

  useEffect(() => {
    _updaterInterval = setInterval(async () => {
      /**
       * @Todo
       */
      const { count } = store.getState().plan_eventCountStore;
      const { title } = store.getState().plan_titleStore;

      if (count === 0) {
        return;
      }
      dispatch(actions.resetPlanEventsCount());

      dispatch(actions.updatePlanOnSaving(true));
      await updatePlanTitle(plan_id as string, title);

      setTimeout(() => {
        dispatch(actions.updatePlanOnSaving(false));
      }, 5000);
    }, 1000);

    return () => {
      if (_updaterInterval !== null) {
        clearInterval(_updaterInterval);
      }
    };
  }, [dispatch, plan_id]);

  return null;
};
