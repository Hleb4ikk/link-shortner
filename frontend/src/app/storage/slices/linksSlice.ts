import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserLink,
  deleteUserLink,
  getLinksPage,
} from '../../../components/features/links/api';
import { Link } from '../../../components/features/links/types/Link';
import { ErrorApiResponseData } from '../../../types/ErrorApiResponseData';
import { CreateLinkResponse } from '../../../components/features/links/types/LinksResponse';

type FetchLinksArgs = {
  currentPage: number;
  searchQuery?: string;
};

export const fetchLinks = createAsyncThunk<
  { currentPage: number; totalPages: number; links: Link[] },
  FetchLinksArgs,
  { rejectValue: ErrorApiResponseData }
>(
  'links/fetchLinks',
  async ({ currentPage, searchQuery }, { rejectWithValue }) => {
    const response = await getLinksPage(currentPage, undefined, searchQuery);
    if ('statusCode' in response) {
      return rejectWithValue(response);
    }

    return { currentPage, ...response };
  },
);

export const deleteLink = createAsyncThunk<
  { currentPage?: number; id: string },
  { currentPage?: number; linkId: string },
  { rejectValue: ErrorApiResponseData }
>('links/deleteLink', async ({ currentPage, linkId }, { rejectWithValue }) => {
  const response = await deleteUserLink(linkId);

  if ('statusCode' in response) {
    return rejectWithValue(response);
  }
  return { currentPage, ...response };
});

export const createLink = createAsyncThunk<
  CreateLinkResponse,
  { originalLink: string; title?: string },
  { rejectValue: ErrorApiResponseData }
>('links/createLink', async ({ originalLink, title }, { rejectWithValue }) => {
  const response = await createUserLink(originalLink, title);

  if ('statusCode' in response) {
    return rejectWithValue(response);
  }
  return response;
});

const links = createSlice({
  name: 'links',
  initialState: {
    deleteError: null,

    isCreating: false,
    createError: null,

    totalPages: 1,
    currentPage: 1,
    pages: {} as Record<number, Link[]>,
    isLoading: false,
    fetchError: null,
  } as {
    deleteError: string | null;

    isCreating: boolean;
    createError: string | null;

    totalPages: number;
    currentPage: number;
    pages: Record<number, Link[]>;
    isLoading: boolean;
    fetchError: string | null;
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
      .addCase(fetchLinks.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.fetchError =
          action.payload?.description ||
          action.payload?.message ||
          'Error getting links.';
        state.isLoading = false;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.pages[action.payload.currentPage] = action.payload.links;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(createLink.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.createError =
          action.payload?.description ||
          action.payload?.message ||
          'Error creating link.';
        state.isCreating = false;
      })

      .addCase(deleteLink.fulfilled, (state, action) => {
        if (action.payload.currentPage) {
          const page = state.pages[action.payload.currentPage];
          if (page) {
            state.pages[action.payload.currentPage] = page.filter(
              (link) => link.id !== action.payload.id,
            );
          }
        }
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.deleteError =
          action.payload?.description ||
          action.payload?.message ||
          'Error deleting links.';
      });
  },
});
export default links.reducer;
export const { setCurrentPage, increment, decrement } = links.actions;
