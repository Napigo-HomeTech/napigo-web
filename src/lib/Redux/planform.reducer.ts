import {
  ASMHealthStatus,
  Category,
  PlanForm,
  PlanItem,
} from "@/types/finance.type";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { find, findIndex, remove } from "lodash";

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
const updateCOL = createAction<string>("planform/update-col");
const updateESM = createAction<number>("planform/update-esm");
const updateASM = createAction<number>("planform/update-asm");
const updateESMAmount = createAction<string>("planform/update-esm-amount");
const updateASMAmount = createAction<string>("planform/update-asm-amount");
const updatePlanItemsList = createAction<PlanItem[]>(
  "planform/update-plan-items-list"
);
const addNewPlanItem = createAction<PlanItem>("planform/add-new-plan-item");
const removePlanItem = createAction<string>("planform/remove-plan-item");
const updatePlanItemNameDatafield = createAction<{
  itemId: string;
  value: string;
}>("planform/update-plan-item-name-datafield");
const updatePlanItemAmountDatafield = createAction<{
  itemId: string;
  value: string;
}>("planform/update-plan-item-amount-datafield");
const updateHealthStatus = createAction<ASMHealthStatus>(
  "planform/update-health-status"
);
const addNewCategory = createAction<Category>("planform/add-new-category");
const removeCategory = createAction<Category>("planform/remove-category");
const editCategory = createAction<Category>("planform/edit-category");

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
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(addNewPlanItem, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        items: [...state.items!, action.payload],
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(removePlanItem, (state, action) => {
    remove(state.items!, { item_id: action.payload });
    return Object.assign(
      state,
      {},
      {
        items: [...state.items!],
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updatePlanItemNameDatafield, (state, action) => {
    /**
     * @ONWATCH
     */
    const { itemId, value } = action.payload;
    const target = find(state.items, { item_id: itemId });
    if (target) {
      const targetIndex = findIndex(state.items, { item_id: itemId });
      state.items?.splice(
        targetIndex,
        1,
        Object.assign(target, {}, { name: value })
      );
      return Object.assign(
        state,
        {},
        {
          items: [...state.items!],
          eventCounts: state.eventCounts + 1,
        }
      );
    }
  });
  build.addCase(updatePlanItemAmountDatafield, (state, action) => {
    const { itemId, value } = action.payload;
    const target = find(state.items, { item_id: itemId });
    if (target) {
      const targetIndex = findIndex(state.items, { item_id: itemId });
      state.items?.splice(
        targetIndex,
        1,
        Object.assign(target, {}, { amount: value })
      );
      return Object.assign(
        state,
        {},
        {
          items: [...state.items!],
          eventCounts: state.eventCounts + 1,
        }
      );
    }
  });
  build.addCase(updateCOL, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        col: action.payload,
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updateASMAmount, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        asm_amount: action.payload,
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updateASM, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        asm_percent: action.payload,
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updateHealthStatus, (state, action) => {
    return Object.assign(
      state,
      {},
      {
        health_status: action.payload,
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(addNewCategory, (state, action) => {
    state.categories?.unshift(action.payload);
    return Object.assign(
      state,
      {},
      {
        categories: [...state.categories!],
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(removeCategory, (state, action) => {
    remove(state.categories!, { name: action.payload.name });
    return Object.assign(
      state,
      {},
      {
        categories: [...state.categories!],
        eventCounts: state.eventCounts + 1,
      }
    );
  });
  build.addCase(updatePlanItemsList, (state, action) => {
    return Object.assign(
      state,
      {},
      { items: [...action.payload], eventCounts: state.eventCounts + 1 }
    );
  });
  build.addCase(editCategory, (state, action) => {
    const targetIndex = findIndex(state.categories, {
      categ_id: action.payload.categ_id,
    });
    state.categories!.splice(targetIndex, 1, action.payload);

    return Object.assign(
      state,
      {},
      {
        categories: [...state.categories!],
        eventCounts: state.eventCounts + 1,
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
  addNewPlanItem,
  removePlanItem,
  updatePlanItemNameDatafield,
  updatePlanItemAmountDatafield,
  updateCOL,
  updateASMAmount,
  updateASM,
  updateHealthStatus,
  addNewCategory,
  removeCategory,
  updatePlanItemsList,
  editCategory,
};
