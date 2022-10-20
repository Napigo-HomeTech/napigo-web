import { createAction, createReducer } from "@reduxjs/toolkit";
import type { Account } from "@/types";

export interface AccountState {
    account: Account | null;
}

const initialState: AccountState = {
    account: null,
};

/**
 * Actionc creators
 */
const setAccount = createAction<Account | null>("account/setAccount");

const accountReducer = createReducer(initialState, (build) => {
    build.addCase(setAccount, (state, action) => {
        state.account = action.payload;
    });
});

/**
 * Export all account related actions via actions object
 */
export const actions = {
    setAccount,
};

export default accountReducer;
