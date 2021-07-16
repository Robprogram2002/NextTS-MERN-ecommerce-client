import { createSlice } from '@reduxjs/toolkit';
import { loginRequest, meRequest } from '../user/user_actions';
import {
  createCategory,
  getCategory,
  removeCategory,
  updateCategory,
  createSub,
  removeSub,
  updateSub,
  getSub,
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

    // categories reducers
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

    // sub categories reducers
    builder.addCase(createSub.pending, (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
      state.warnningMessage = null;
    });
    builder.addCase(getSub.pending, (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
      state.warnningMessage = null;
      state.redirectTo = null;
    });
    builder.addCase(createSub.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.successMessage = `sub category ${payload.newSub.name} created`;
    });
    builder.addCase(getSub.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateSub.pending, (state) => {
      state.loading = true;
      state.successMessage = null;
      state.errorMessage = null;
      state.warnningMessage = null;
    });
    builder.addCase(updateSub.fulfilled, (state) => {
      state.successMessage = "the sub category's name has been updated";
      state.redirectTo = '/admin/sub-categories';
      state.loading = false;
    });
    builder.addCase(updateSub.rejected, (state) => {
      state.errorMessage = 'Opps , something went wrong';
      state.loading = false;
    });

    builder.addCase(removeSub.fulfilled, (state) => {
      state.successMessage = 'sub category removed';
    });
  },
});

export const appStateActions = appSlice.actions;

export default appSlice;
