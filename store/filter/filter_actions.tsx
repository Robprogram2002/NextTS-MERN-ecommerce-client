import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductsByFilter = createAsyncThunk(
  'products/filter',
  async (arg: any) => {
    try {
      const response = await axios.post(`products/search/filters`, arg);

      return {
        products: response.data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const something = createAsyncThunk('products/askndjas', async () => {});
