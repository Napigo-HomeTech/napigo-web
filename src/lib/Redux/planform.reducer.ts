import { PlanForm } from "@/types/finance.type";
import { createAction, createReducer } from "@reduxjs/toolkit";

export interface PlanformStoreState extends Partial<PlanForm> {
  isReady: boolean;
  onSaving: boolean;
  eventCounts: number;
  loadingError: Error | null;
}

const initialPlanformStore: PlanformStoreState = {
  isReady: false,
  onSaving: false,
  eventCounts: 0,
  loadingError: null,
};

/**
 * Action creators
 */

const resetPlanformDefaultState = createAction(
  "planform/reset-planform-default-state"
);
const planFormIsReady = createAction<boolean>("planform/is-ready");
const planFormOnSaving = createAction<boolean>("planform/on-saving");
const incrementEventCounts = createAction("planform/update-event-counts");
const resetEventCounts = createAction("planform/reset-event-counts");
const setLoadingError = createAction<Error | null>(
  "planform/set-loading-error"
);
const loadData = createAction<PlanForm>("planform/load-data");
const updateTitle = createAction<string>("planform/update-title");
const updateIncome = createAction<string>("planform/update-income");
const updateESM = createAction<number>("planform/update-esm");
const updateESMAmount = createAction<string>("planform/update-esm-amount");

const PlanformReducer = createReducer(initialPlanformStore, (build) => {
  build.addCase(resetPlanformDefaultState, () => {
    return { ...initialPlanformStore };
  });
  build.addCase(planFormIsReady, (state, action) => {
    state.isReady = action.payload;
  });
  build.addCase(planFormOnSaving, (state, action) => {
    state.onSaving = action.payload;
  });
  build.addCase(incrementEventCounts, (state, _) => {
    state.eventCounts = state.eventCounts + 1;
  });
  build.addCase(resetEventCounts, (state, _) => {
    state.eventCounts = 0;
  });
  build.addCase(setLoadingError, (state, action) => {
    state.loadingError = action.payload;
  });
  build.addCase(loadData, (state, action) => {
    return Object.assign(state, {}, { ...action.payload });
  });
  build.addCase(updateTitle, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        title: action.payload,
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updateIncome, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        net_income: action.payload,
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updateESM, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        esm_percent: action.payload,
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updateESMAmount, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        esm_amount: action.payload,
        evenCounts: state.eventCounts + 1,
      }
    );
  });
});

export const reducers = {
  PlanformReducer,
};

export const PlanformActions = {
  resetPlanformDefaultState,
  planFormIsReady,
  planFormOnSaving,
  incrementEventCounts,
  resetEventCounts,
  setLoadingError,
  loadData,
  updateTitle,
  updateIncome,
  updateESM,
  updateESMAmount,
};