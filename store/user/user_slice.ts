import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './user_actions';

// Define a type for the slice state
interface useState {
  username: string | null;
  email: string | null;
  userId: string | null;
  imageUrl: string | null;
  authToken: string | null;
  authenticated: boolean;
  value: number;
}

// Define the initial state using that type
const initialState: useState = {
  username: null,
  email: null,
  userId: null,
  imageUrl: null,
  authToken: null,
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
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.username = payload.user.username;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
