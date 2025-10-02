import { createSlice } from '@reduxjs/toolkit';

const links = createSlice({
  name: 'links',
  initialState: [] as Array<{ id: string | number }>,
  reducers: {
    addLink: (state, action) => {
      state.push({ id: action.payload });
    },
    deleteLink: (state, action) => {
      return state.filter(
        (link: { id: string | number }) => link.id !== action.payload,
      );
    },
  },
});

export const { addLink, deleteLink } = links.actions;
export default links.reducer;
