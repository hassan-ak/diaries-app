// imports
// redux toolkit imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types declaration
// interface for AuthState which is going to be data type for initial state
interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}
// initial data for the auth state
const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
};

// Create slice for authantication
const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reducer action to save token
        saveToken(state, { payload }: PayloadAction<string>) {
            if (payload) {
                state.token = payload;
            }
        },
        // reducer action to clearToken
        clearToken(state) {
            state.token = null;
        },
        // reducer action to save authantication
        setAuthState(state, { payload }: PayloadAction<boolean>) {
            state.isAuthenticated = payload
        },
    },
});

// Actions export
export const { saveToken, clearToken, setAuthState } = auth.actions;
// reducer Export
export default auth.reducer;