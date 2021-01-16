// Imports
// Redux toolkit imports
import { combineReducers } from "@reduxjs/toolkit";
// reducer imports
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/auth/userSlice";
import diariesReducer from "./features/diary/diariesSlice";
import entriesReducer from "./features/entry/entriesSlice";
import editorReducer from "./features/entry/editorSlice";

// combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    diaries: diariesReducer,
    entries: entriesReducer,
    user: userReducer,
    editor: editorReducer,
});

// RootState Type export
export type RootState = ReturnType<typeof rootReducer>;
// combined reducer
export default rootReducer;