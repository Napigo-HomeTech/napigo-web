import { createAction, createReducer } from "@reduxjs/toolkit";

/**
 * ------------------------------------------------------------
 * PlanForm events counts
 * ------------------------------------------------------------
 */
export interface PlanEventsCountState {
  count: 0;
}

/**
 * Action creators
 */
const increasePlanEventsCount = createAction("plan/increase-plan-event-count");
const resetPlanEventsCount = createAction("plan/reset-plan-events-count");

const planEventCountReducer = createReducer({ count: 0 }, (build) => {
  build.addCase(increasePlanEventsCount, (state, _) => {
    state.count = state.count + 1;
  });
  build.addCase(resetPlanEventsCount, (state, _) => {
    state.count = 0;
  });
});
/**
 * ------------------------------------------------------------
 * Plan title
 * ------------------------------------------------------------
 */
export interface PlanIitleState {
  title: string | "untitled";
  isReady: boolean;
}
const initialPlanTitleState: PlanIitleState = {
  title: "untitled",
  isReady: false,
};
/**
 * Action creators
 */
const updateTitle = createAction<string | "untitled">("plan/title");
const titleIsReady = createAction<boolean>("plan/title-is-ready");

const planTitleReducer = createReducer(initialPlanTitleState, (build) => {
  build.addCase(updateTitle, (state, action) => {
    state.title = action.payload;
  });
  build.addCase(titleIsReady, (state, action) => {
    state.isReady = action.payload;
  });
});

export const actions = {
  updateTitle,
  titleIsReady,
  increasePlanEventsCount,
  resetPlanEventsCount,
};

export const reducers = {
  planTitleReducer,
  planEventCountReducer,
};
