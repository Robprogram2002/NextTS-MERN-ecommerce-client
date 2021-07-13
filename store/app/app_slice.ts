import { createSlice } from '@reduxjs/toolkit';
import { loginRequest, meRequest } from '../user/user_actions';

interface AppSliceState {
  redirectTo: string | null;
  initialLoading: boolean;
}

const initialState: AppSliceState = {
  redirectTo: null,
  initialLoading: true,
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
  },
});

export const appStateActions = appSlice.actions;

export default appSlice;
