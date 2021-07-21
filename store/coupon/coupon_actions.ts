import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoupons = createAsyncThunk('coupons/list', async () => {
  try {
    const response = await axios.get('/coupons/list');

    if (response.status !== 200) throw new Error('something went wrong');

    return {
      coupons: response.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

interface createCouponPayload {
  name: string;
  expiry: any;
  discount: number;
}

export const createCoupon = createAsyncThunk(
  'coupons/create',
  async ({ name, expiry, discount }: createCouponPayload) => {
    try {
      const response = await axios.post('/coupons/create', {
        name,
        expiry,
        discount,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newCoupon: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeCoupon = createAsyncThunk(
  'coupons/remove',
  async (couponId: string) => {
    try {
      const response = await axios.delete(`/coupons/remove/${couponId}`);

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        message: response.data.message,
        couponId,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
