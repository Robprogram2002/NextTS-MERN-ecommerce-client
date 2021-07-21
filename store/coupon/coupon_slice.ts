import { createSlice } from '@reduxjs/toolkit';
import { createCoupon, getCoupons, removeCoupon } from './coupon_actions';

interface CouponSliceState {
  coupons: any[];
}

const initialState: CouponSliceState = {
  coupons: [],
};

const couponSlice = createSlice({
  name: 'couponSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCoupon.fulfilled, (state, { payload }) => {
      state.coupons.splice(0, 0, payload.newCoupon);
    });
    builder.addCase(getCoupons.fulfilled, (state, { payload }) => {
      state.coupons = payload.coupons;
    });
    builder.addCase(removeCoupon.fulfilled, (state, { payload }) => {
      state.coupons = state.coupons.filter(
        (coupon) => coupon._id.toString() !== payload.couponId.toString()
      );
    });
  },
});

export default couponSlice;
