import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ErrorApiResponseData } from '../../../types/ErrorApiResponseData';
import { fetchLinksDetails } from '../../../components/features/linksDetails/api';
import { Audience } from '../../../components/features/linksDetails/types/Audience';
import { Link } from '../../../components/features/links/types/Link';

type FetchLinkDetailsArgs = {
  linkId: string;
  currentPage: number;
};

export const getLinksDetails = createAsyncThunk<
  {
    currentPage: number;
    totalPages: number;
    audience: Audience[];
    link: Omit<Link, 'id' | 'audienceCount'>;
  },
  FetchLinkDetailsArgs,
  { rejectValue: ErrorApiResponseData }
>(
  'linksDetails/getLinksDetails',
  async ({ linkId, currentPage }, { rejectWithValue }) => {
    const details = await fetchLinksDetails(linkId, currentPage);

    if ('statusCode' in details) {
      return rejectWithValue(details);
    }
    return {
      currentPage,
      ...details,
    };
  },
);

const linksDetails = createSlice({
  name: 'linksDetails',
  initialState: {
    fetchError: null,
    isLoading: false,
    details: null,
    link: null,

    pages: {} as Record<number, Audience[]>,
    totalPages: 1,
    currentPage: 1,
  } as {
    isLoading: boolean;
    fetchError: ErrorApiResponseData | string | null;
    link: Omit<Link, 'id' | 'audienceCount'> | null;
    pages: Record<number, Audience[]>;
    totalPages: number;
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
  extraReducers: (builder) => {
    builder
      .addCase(getLinksDetails.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(getLinksDetails.rejected, (state, action) => {
        state.fetchError = action.payload || 'Failed to fetch details.';
        state.isLoading = false;
      })
      .addCase(getLinksDetails.fulfilled, (state, action) => {
        state.pages[action.payload.currentPage] = action.payload.audience;
        state.totalPages = action.payload.totalPages;
        state.link = action.payload.link;
        state.isLoading = false;
      });
  },
});
export default linksDetails.reducer;
export const { setCurrentPage, increment, decrement } = linksDetails.actions;
