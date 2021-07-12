import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'user/sign-in',
  async (authResult: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/sign-in`,
        {
          authResult,
        }
      );

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        user: response.data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
);

interface registerPayload {
  username: string;
  email: string;
  imageUrl: string | null;
}

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ username, email, imageUrl }: registerPayload) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/sign-up`,
        {
          username,
          email,
          imageUrl,
        }
      );

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        message: response.data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
);
