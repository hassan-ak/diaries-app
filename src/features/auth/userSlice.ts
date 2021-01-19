// imports
// redux toolkit imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface imports
import { User } from '../../interfaces/user.interface';

// Create slice for setUser
const user = createSlice({
    name: 'user',
    initialState: null as User | null,
    reducers: {
        // reducer action to setUser
        setUser(state, { payload }: PayloadAction<User | null>) {
            return state = (payload != null) ? payload : null;
        },
    },
});

// Actions export
export const { setUser } = user.actions;
// reducer Export
export default user.reducer;