// imports
// Redux tool kit import
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface imports
import { Entry } from '../../interfaces/entry.interface';

// interface being used in initial state
interface EditorState {
    canEdit: boolean;
    currentlyEditing: Entry | null;
    activeDiaryId: string | null;
}

// initial state
const initialState: EditorState = {
    canEdit: false,
    currentlyEditing: null,
    activeDiaryId: null,
};

// Create slice for editor
const editor = createSlice({
    name: 'editor',
    initialState,
    // reducers
    reducers: {
        // reducer action to set canEdit ability for user
        setCanEdit(state, { payload }: PayloadAction<boolean>) {
            state.canEdit = payload != null ? payload : !state.canEdit;
        },
        // reducer action for setting currently editing
        setCurrentlyEditing(state, { payload }: PayloadAction<Entry | null>) {
            state.currentlyEditing = payload;
        },
        // reducer action to set activate diary Id
        setActiveDiaryId(state, { payload }: PayloadAction<string>) {
            state.activeDiaryId = payload;
        },
    },
});

// reducer actions exports
export const { setCanEdit, setCurrentlyEditing, setActiveDiaryId } = editor.actions;
// reducer exports
export default editor.reducer;