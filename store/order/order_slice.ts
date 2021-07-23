import { createSlice } from '@reduxjs/toolkit';
import { getUserOrders, getAllOrders, updateUserOrder } from './order_actions';

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
    builder.addCase(getAllOrders.fulfilled, (state, { payload }) => {
      state.orders = payload.orders;
    });
    builder.addCase(updateUserOrder.fulfilled, (state, { payload }) => {
      const index = state.orders.findIndex(
        (order) => order._id.toString() === payload.orderId.toString()
      );

      state.orders[index].orderStatus = payload.status;
    });
  },
});

export default orderSlice;
