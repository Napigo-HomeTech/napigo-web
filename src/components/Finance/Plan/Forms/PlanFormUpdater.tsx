import { updatePlanDatafield } from "@/lib/Finance/finance-service-apis";
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
    /**
     * @ONWATCH
     * This interval is doing some async operations and will take sometimes
     * for it to be done, while, doing the work, there are possibility that the interval
     * will fire anthor async operation in the background.. thus the function beloww
     * may run in "parallel" somehow..please watch over any unexpected side effects
     * or data out of sync , race condition etc... fix or refactor if needed
     */
    _updaterInterval = setInterval(async () => {
      const { count } = store.getState().plan_eventCountStore;
      const { title } = store.getState().plan_datafield_title;

      if (count === 0) {
        return;
      }
      dispatch(actions.resetPlanEventsCount());

      dispatch(actions.updatePlanOnSaving(true));
      await updatePlanDatafield(plan_id as string, "title", "string", title);

      dispatch(actions.updatePlanOnSaving(false));
    }, 1000);

    return () => {
      if (_updaterInterval !== null) {
        clearInterval(_updaterInterval);
      }
    };
  }, [dispatch, plan_id]);

  return null;
};
