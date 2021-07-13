import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginRequest = createAsyncThunk(
  'user/sign-in',
  async ({ authResult, redirectTo }: any) => {
    try {
      const response = await axios.post('/auth/sign-in', {
        authResult,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        user: response.data.user,
        redirectTo,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
);

interface registerPayload {
  username: string;
  email: string;
}

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, email }: registerPayload) => {
    try {
      const response = await axios.post(`/auth/sign-up`, {
        username,
        email,
      });
      console.log(response);
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        message: response.data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const meRequest = createAsyncThunk('user/me-request', async () => {
  try {
    const response = await axios.get('/auth/me');

    if (response.status !== 200) throw new Error('something went wrong');

    console.log(response);

    return {
      user: response.data.user,
    };
  } catch (err) {
    throw new Error(err.message);
  }
});

export const logoutRequest = createAsyncThunk('user/logout', async () => {
  try {
    const response = await axios.get('/auth/logout');

    if (response.status !== 200) throw new Error('something went wrong');

    return { 
      message: response.data
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
