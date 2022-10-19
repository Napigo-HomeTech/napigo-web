import { createAction, createReducer } from "@reduxjs/toolkit";

/**
 * Action creators
 */
const authReady = createAction<boolean>("appcontext/authReady");
const accountReady = createAction<boolean>("appcontext/accountReady");
const loading = createAction<boolean>("appcontext/loading");
const error = createAction<string | null>("appcontext/error");

export interface AppContextState {
    authReady: boolean;
    accountReady: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AppContextState = {
    authReady: false,
    accountReady: false,
    loading: true,
    error: null,
};

/**
 * Reducers for app context
 */
const appContextReducer = createReducer(initialState, (build) => {
    build
        .addCase(authReady, (state, action) => {
            state.authReady = action.payload;
        })
        .addCase(accountReady, (state, action) => {
            state.accountReady = action.payload;
        })
        .addCase(loading, (state, action) => {
            state.loading = action.payload;
        })
        .addCase(error, (state, action) => {
            state.error = action.payload;
        });
});

export const actions = {
    authReady,
    accountReady,
    loading,
    error,
};
export default appContextReducer;
