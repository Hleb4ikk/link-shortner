import { configureStore } from '@reduxjs/toolkit';
import linksReducer from './slices/linksSlice';
import linksDetailsReducer from './slices/linksDetailsSlice';
const store = configureStore({
  reducer: {
    links: linksReducer,
    linksDetails: linksDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
