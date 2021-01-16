// imports
// redux toolkit imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface imports
import { Diary } from '../../interfaces/diary.interface';

// createSlice for diaries
const diaries = createSlice({
    name: 'diaries',
    initialState: [] as Diary[],
    // Reducers
    reducers: {
        // reducer Action to addDiary
        addDiary(state, { payload }: PayloadAction<Diary[]>) {
            const diariesToSave = payload.filter((diary) => {
                return state.findIndex((item) => item.id === diary.id) === -1;
            });
        state.push(...diariesToSave);
        },
        // reducer action to updatediary
        updateDiary(state, { payload }: PayloadAction<Diary>) {
            const { id } = payload;
            const diaryIndex = state.findIndex((diary) => diary.id === id);
            if (diaryIndex !== -1) {
                state.splice(diaryIndex, 1, payload);
            }
        },
    },
});

// reducer action export
export const { addDiary, updateDiary } = diaries.actions;
// reducer export
export default diaries.reducer;