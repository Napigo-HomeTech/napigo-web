import { createAction, createReducer } from "@reduxjs/toolkit";
import type { Account } from "@/types";

export interface AccountState {
  account: Account | null;
  csrf: string | null;
}

const initialState: AccountState = {
  account: null,
  csrf: null,
};

/**
 * Actionc creators
 */
const setAccount = createAction<Account | null>("account/setAccount");
const setCSRF = createAction<string | null>("account/csrf");

const accountReducer = createReducer(initialState, (build) => {
  build.addCase(setAccount, (state, action) => {
    state.account = action.payload;
  });
  build.addCase(setCSRF, (state, action) => {
    state.csrf = action.payload;
  });
});

/**
 * Export all account related actions via actions object
 */
export const actions = {
  setAccount,
  setCSRF,
};

export default accountReducer;
