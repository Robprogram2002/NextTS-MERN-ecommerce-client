import { createSlice } from '@reduxjs/toolkit';
import { getUserOrders } from './order_actions';

interface OrderSliceState {
  orders: any[];
  currentOrder: any | null;
  loading: boolean;
}

const initialState: OrderSliceState = {
  orders: [],
  currentOrder: null,
  loading: false,
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.orders;
      state.loading = false;
    });
  },
});

export default orderSlice;
