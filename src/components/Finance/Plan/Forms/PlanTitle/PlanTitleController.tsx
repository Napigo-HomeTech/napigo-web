import { RootState } from "@/lib/Redux/store";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlanTitleUI } from "./PlanTitleUI";
import { Skeleton } from "@chakra-ui/react";
import { PlanformActions } from "@/lib/Redux/planform.reducer";

export const PlanTitleContoller: React.FC = () => {
  const dispatch = useDispatch();

  const { title, isReady } = useSelector(
    (state: RootState) => state.planformStore
  );

  return (
    <Fragment>
      {isReady ? (
        <PlanTitleUI
          defaultValue={title as string}
          onInputChange={(val: string) => {
            if (val !== title) {
              dispatch(PlanformActions.updateTitle(val));
            }
          }}
        />
      ) : (
        <Skeleton
          height={"36px"}
          width="300px"
          rounded={"md"}
          startColor="gray.100"
          endColor="gray.200"
        />
      )}
    </Fragment>
  );
};
