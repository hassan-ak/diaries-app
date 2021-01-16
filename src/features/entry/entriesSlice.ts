// imports
// Redux tool kit import
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface imports
import { Entry } from '../../interfaces/entry.interface';

const entries = createSlice({
    name: 'entries',
    initialState: [] as Entry[],
    reducers: {
        // action to set enteries
        setEntries(state, { payload }: PayloadAction<Entry[] | null>) {
            return (state = payload != null ? payload : []);
        },
        // action to update ntries
        updateEntry(state, { payload }: PayloadAction<Entry>) {
            const { id } = payload;
            const index = state.findIndex((e) => e.id === id);
            if (index !== -1) {
                state.splice(index, 1, payload);
            }
        },
    },
});

// actions export
export const { setEntries, updateEntry } = entries.actions;
// reducer export
export default entries.reducer;