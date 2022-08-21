import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account.reducer";
import appContextReducer from "./appcontext.reducer";

export const store = configureStore({
  reducer: {
    appContextStore: appContextReducer,
    accountStore: accountReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
