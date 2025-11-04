import { configureStore } from '@reduxjs/toolkit';
import linksReducer from './slices/linksSlice';
import paginationReducer from './slices/paginationSlice';
const store = configureStore({
  reducer: {
    links: linksReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
