import { RootState } from "@/lib/Redux/store";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlanTitleUI } from "./PlanTitleUI";
import { Skeleton } from "@chakra-ui/react";
import { actions } from "@/lib/Redux/plan-form-reducer";

export const PlanTitleContoller: React.FC = () => {
  const dispatch = useDispatch();

  const { title, isReady } = useSelector(
    (state: RootState) => state.plan_datafield_title
  );

  return (
    <Fragment>
      {isReady ? (
        <PlanTitleUI
          defaultValue={title}
          onInputChange={(val: string) => {
            if (val !== title) {
              dispatch(actions.updateTitle(val));
              dispatch(actions.increasePlanEventsCount());
            }
          }}
        />
      ) : (
        <Skeleton
          height={"46px"}
          width="300px"
          rounded={"md"}
          startColor="gray.100"
          endColor="gray.200"
        />
      )}
    </Fragment>
  );
};
