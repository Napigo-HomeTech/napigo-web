import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Will list all other possible auth actions
 * that will trigger onAuthStateChanged
 */
type RegistrationStatus = "idle" | "processing" | "onsuccess" | "onerror";

export interface RegistrationState {
    status: RegistrationStatus;
}

const initialState: RegistrationState = {
    status: "idle",
};

/**
 * Slices for the auth actions
 */
const registrationStatusSlice = createSlice({
    name: "registration-status",
    initialState,
    reducers: {
        updateStatus: (state, action: PayloadAction<RegistrationStatus>) => {
            state.status = action.payload;
        },
    },
});

export const actions = registrationStatusSlice.actions;
export default registrationStatusSlice.reducer;
