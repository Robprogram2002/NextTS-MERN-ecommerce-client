import { createSlice } from '@reduxjs/toolkit';
import { loginRequest, meRequest } from '../user/user_actions';
import {
  createCategory,
  getCategory,
  removeCategory,
  updateCategory,
} from '../category/category_actions';

interface AppSliceState {
  redirectTo: string | null;
  initialLoading: boolean;
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  warnningMessage: string | null;
}

const initialState: AppSliceState = {
  redirectTo: null,
  initialLoading: true,
  loading: false,
  successMessage: null,
  errorMessage: null,
  warnningMessage: null,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, { payload }) => {
      state.redirectTo = payload.redirectTo;
    });
    builder.addCase(meRequest.fulfilled, (state) => {
      state.initialLoading = false;
    });
    builder.addCase(meRequest.rejected, (state) => {
      state.initialLoading = false;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
      state.warnningMessage = null;
    });
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
      state.warnningMessage = null;
      state.redirectTo = null;
    });
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.successMessage = `category ${payload.category.name} created`;
    });
    builder.addCase(getCategory.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.successMessage = null;
      state.errorMessage = null;
      state.warnningMessage = null;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.successMessage = 'category name updated';
      state.redirectTo = '/admin/category';
    });
    builder.addCase(removeCategory.fulfilled, (state) => {
      state.successMessage = 'category removed';
    });
  },
});

export const appStateActions = appSlice.actions;

export default appSlice;
