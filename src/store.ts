// imports
// react redux imports
import { useDispatch } from 'react-redux';
// redux toolkit imports
import { configureStore } from '@reduxjs/toolkit';
// reducer imports
import rootReducer from './rootReducer';

// configure store
const store = configureStore({
    reducer: rootReducer,
});

// exports
// type exports for AppDispatch
export type AppDispatch = typeof store.dispatch;
// use AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Export store
export default store;