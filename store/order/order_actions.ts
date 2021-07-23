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

export const getAllOrders = createAsyncThunk('orders/get-all', async () => {
  try {
    const response = await axios.get('/orders/all');

    if (response.status !== 200) throw new Error('something went wrong');

    return {
      orders: response.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

interface UpdateOrderPayload {
  orderId: string;
  status: string;
}

export const updateUserOrder = createAsyncThunk(
  'orders/update',
  async ({ orderId, status }: UpdateOrderPayload) => {
    try {
      const response = await axios.patch('/orders/update', {
        status,
        orderId,
      });
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        order: response.data,
        orderId,
        status,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
