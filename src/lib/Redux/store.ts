import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { FinanceApis } from "../API/finance-apis";
import accountReducer from "./account.reducer";
import appContextReducer from "./appcontext.reducer";

export const store = configureStore({
    reducer: {
        appContextStore: appContextReducer,
        accountStore: accountReducer,
        [FinanceApis.reducerPath]: FinanceApis.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(FinanceApis.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
