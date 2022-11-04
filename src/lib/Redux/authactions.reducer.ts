import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Will list all other possible auth actions
 * that will trigger onAuthStateChanged
 */
type AuthAction =
    | "signout"
    | "login"
    | "resetpassword"
    | "register"
    | "confirmingemail"
    | null;

export interface AuthActionState {
    action: AuthAction;
}

const initialState: AuthActionState = {
    action: null,
};

/**
 * Slices for the auth actions
 */
const authActionSlice = createSlice({
    name: "auth-action",
    initialState,
    reducers: {
        authAction: (state, action: PayloadAction<AuthAction>) => {
            state.action = action.payload;
        },
    },
});

export const actions = authActionSlice.actions;
export default authActionSlice.reducer;
