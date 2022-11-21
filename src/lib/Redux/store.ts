import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import accountReducer from "./account.reducer";
import appContextReducer from "./appcontext.reducer";
import { reducers } from "./plan-form-reducer";

export const store = configureStore({
  reducer: {
    appContextStore: appContextReducer,
    accountStore: accountReducer,
    plan_eventCountStore: reducers.planEventCountReducer,
    plan_onSavingStore: reducers.planFormOnSavingReducer,
    plan_datafield_income: reducers.planIncomeDataFieldReducer,
    plan_datafield_title: reducers.planTitleReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
