import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, meRequest, logoutRequest } from './user_actions';

// Define a type for the slice state
interface useState {
  username: string | null;
  email: string | null;
  userId: string | null;
  imageUrl: string | null;
  authenticated: boolean;
  value: number;
}

// Define the initial state using that type
const initialState: useState = {
  username: null,
  email: null,
  userId: null,
  imageUrl: null,
  authenticated: false,
  value: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.username = user.username;
      state.email = user.email;
      state.imageUrl = user.photoUrl;
      state.userId = user._id;
      state.authenticated = true;
    });
    builder.addCase(meRequest.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.username = user.username;
      state.email = user.email;
      state.imageUrl = user.photoUrl;
      state.userId = user._id;
      state.authenticated = true;
    });
    builder.addCase(logoutRequest.fulfilled, (state) => {
      state.username = initialState.username;
      state.email = initialState.email;
      state.imageUrl = initialState.imageUrl;
      state.userId = initialState.userId;
      state.authenticated = false;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
