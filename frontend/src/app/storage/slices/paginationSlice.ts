import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pagination = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
  } as {
    currentPage: number;
  },
  reducers: {
    increment: (state) => {
      state.currentPage++;
    },
    decrement: (state) => {
      state.currentPage--;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage, increment, decrement } = pagination.actions;
export default pagination.reducer;
