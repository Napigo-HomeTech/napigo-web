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
interface PlanTitleState {
  title: string | "untitled";
  isReady: boolean;
}
const initialPlanTitleState: PlanTitleState = {
  title: "untitled",
  isReady: false,
};
/**
 * Action creators
 */
const updateTitle = createAction<string | "untitled">("plan/datafield/title");
const titleIsReady = createAction<boolean>("plan/datafield/title/is-ready");

const planTitleReducer = createReducer(initialPlanTitleState, (build) => {
  build.addCase(updateTitle, (state, action) => {
    state.title = action.payload;
  });
  build.addCase(titleIsReady, (state, action) => {
    state.isReady = action.payload;
  });
});

/**
 * ------------------------------------------------------------
 * Plan's Income Datafield amount
 * ------------------------------------------------------------
 */
interface PlanIncomeDataFieldState {
  amount: string;
  isReady: boolean;
}
const initialPlanIncomeDataFieldState: PlanIncomeDataFieldState = {
  amount: "0.00",
  isReady: false,
};
/**
 * Action creators
 */
const updateIncomeDataField = createAction<string>("plan/datafield/income");
const incomeDataFieldIsReady = createAction<boolean>(
  "plan/datafield/income/is-ready"
);

const planIncomeDataFieldReducer = createReducer(
  initialPlanIncomeDataFieldState,
  (build) => {
    build.addCase(updateIncomeDataField, (state, action) => {
      state.amount = action.payload;
    });
    build.addCase(incomeDataFieldIsReady, (state, action) => {
      state.isReady = action.payload;
    });
  }
);

export const actions = {
  increasePlanEventsCount,
  resetPlanEventsCount,
  updatePlanOnSaving,
  updateTitle,
  titleIsReady,
  updateIncomeDataField,
  incomeDataFieldIsReady,
};

export const reducers = {
  planEventCountReducer,
  planFormOnSavingReducer,
  planTitleReducer,
  planIncomeDataFieldReducer,
};
