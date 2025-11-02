import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createUserLink,
  deleteUserLink,
  getUserLinks,
} from '../../../components/features/links/api';
import { Link } from '../../../components/features/links/types/Link';
import { ErrorApiResponseData } from '../../../types/ErrorApiResponseData';
import { CreateLinkResponse } from '../../../components/features/links/types/LinksResponse';

export const fetchLinks = createAsyncThunk<
  { links: Link[] },
  void,
  { rejectValue: ErrorApiResponseData }
>('links/fetchLinks', async (_, { rejectWithValue }) => {
  const response = await getUserLinks();

  if ('statusCode' in response) {
    return rejectWithValue(response);
  }
  return response;
});

export const deleteLink = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: ErrorApiResponseData }
>('links/deleteLink', async (id, { rejectWithValue }) => {
  const response = await deleteUserLink(id);

  if ('statusCode' in response) {
    return rejectWithValue(response);
  }
  return response;
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
    isCreating: false,
    isLoading: false,
    data: null,
    error: null,
  } as {
    isCreating: boolean;
    isLoading: boolean;
    data: Link[] | null;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.data = action.payload.links;
        state.isLoading = false;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.error =
          action.payload?.description ||
          action.payload?.message ||
          'Error getting links.';
        state.isLoading = false;
      })
      .addCase(createLink.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.error =
          action.payload?.description ||
          action.payload?.message ||
          'Error creating link.';
        state.isCreating = false;
      })

      .addCase(deleteLink.fulfilled, (state, action) => {
        if (state.data) {
          state.data = state.data.filter(
            (link) => link.id !== action.payload.id,
          );
        }
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.error =
          action.payload?.description ||
          action.payload?.message ||
          'Error deleting links.';
      });
  },
});

export default links.reducer;
