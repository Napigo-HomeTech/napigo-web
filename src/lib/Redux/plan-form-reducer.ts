import { createAction, createReducer } from "@reduxjs/toolkit";

/**
 * ------------------------------------------------------------
 * PlanForm events counts
 * ------------------------------------------------------------
 */
interface PlanEventsCountState {
  count: number;
}

const initialPlanEventCountState: PlanEventsCountState = {
  count: 0,
};

/**
 * Action creators
 */
const increasePlanEventsCount = createAction("plan/increase-plan-event-count");
const resetPlanEventsCount = createAction("plan/reset-plan-events-count");

const planEventCountReducer = createReducer(
  initialPlanEventCountState,
  (build) => {
    build.addCase(increasePlanEventsCount, (state, _) => {
      state.count = state.count + 1;
    });
    build.addCase(resetPlanEventsCount, (state, _) => {
      state.count = 0;
    });
  }
);

/**
 * ------------------------------------------------------------
 * PlanForm saving indicator
 * ------------------------------------------------------------
 */
interface PlanOnSavingState {
  onSaving: boolean;
}

const initialPlanOnSavingState: PlanOnSavingState = {
  onSaving: false,
};
/**
 * Action creators
 */
const updatePlanOnSaving = createAction<boolean>(
  "plan/update-planform-on-saving"
);

const planFormOnSavingReducer = createReducer(
  initialPlanOnSavingState,
  (build) => {
    build.addCase(updatePlanOnSaving, (state, action) => {
      state.onSaving = action.payload;
    });
  }
);

/**
 * ------------------------------------------------------------
 * Plan title
 * ------------------------------------------------------------
 */
interface PlanIitleState {
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
  increasePlanEventsCount,
  resetPlanEventsCount,
  updatePlanOnSaving,
  updateTitle,
  titleIsReady,
};

export const reducers = {
  planEventCountReducer,
  planFormOnSavingReducer,
  planTitleReducer,
};
