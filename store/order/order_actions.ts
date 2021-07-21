import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserOrders = createAsyncThunk('orders/by-user', async () => {
  try {
    const response = await axios.get('/user/cart/orders');

    if (response.status !== 200) throw new Error('something went wrong');

    return {
      orders: response.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateUserOrder = createAsyncThunk(
  'orders/update',
  async () => {}
);
