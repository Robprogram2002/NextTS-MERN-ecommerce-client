import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../../types/Cart';
import {
  loginRequest,
  meRequest,
  logoutRequest,
  addProductToCart,
  removeProduct,
  changeProductCount,
  changeProductColor,
  saveUserAddress,
  emptyUserCart,
  getCompleteCart,
  applyCoupon,
} from './user_actions';

// Define a type for the slice state
interface useState {
  username: string | null;
  email: string | null;
  userId: string | null;
  imageUrl: string | null;
  authenticated: boolean;
  role: string | null;
  value: number;
  address: string | null;
  cart: Cart;
}

// Define the initial state using that type
const initialState: useState = {
  username: null,
  email: null,
  userId: null,
  imageUrl: null,
  authenticated: false,
  role: null,
  value: 0,
  address: null,
  cart: {
    products: [],
    totalAmount: 0,
    appliedCoupon: null,
  },
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
    builder.addCase(loginRequest.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.username = user.username;
      state.email = user.email;
      state.imageUrl = user.photoUrl;
      state.userId = user._id;
      state.authenticated = true;
      state.role = user.role;
      state.address = user.address;
      state.cart = user.cart;
    });
    builder.addCase(meRequest.fulfilled, (state, { payload }) => {
      const { user } = payload;
      state.username = user.username;
      state.email = user.email;
      state.imageUrl = user.photoUrl;
      state.userId = user._id;
      state.authenticated = true;
      state.role = user.role;
      state.address = user.address;
      state.cart = user.cart;
    });
    builder.addCase(logoutRequest.fulfilled, (state) => {
      state.username = initialState.username;
      state.email = initialState.email;
      state.imageUrl = initialState.imageUrl;
      state.userId = initialState.userId;
      state.authenticated = false;
      state.role = initialState.role;
      state.address = initialState.address;
      state.cart = initialState.cart;
    });
    builder.addCase(addProductToCart.fulfilled, (state, { payload }) => {
      state.cart = payload.newCart;
    });
    builder.addCase(removeProduct.fulfilled, (state, { payload }) => {
      const { products } = state.cart;
      const filtered = products.filter((obj) => {
        if (typeof obj.product === 'string') {
          return obj.product !== payload.productId;
        }
        return obj.product._id.toString() !== payload.productId.toString();
      });
      state.cart = {
        totalAmount: payload.newCart.totalAmount,
        appliedCoupon: payload.newCart.appliedCoup,
        products: filtered,
      };
    });
    builder.addCase(changeProductCount.fulfilled, (state, { payload }) => {
      state.cart = payload.newCart;
    });
    builder.addCase(changeProductColor.fulfilled, (state, { payload }) => {
      const index = state.cart.products.findIndex(({ product }) => {
        if (typeof product === 'string') {
          return product === payload.productId;
        }
        return product._id === payload.productId;
      });
      state.cart.products[index].color = payload.color;
    });
    builder.addCase(saveUserAddress.fulfilled, (state, { payload }) => {
      state.address = payload.address;
    });
    builder.addCase(emptyUserCart.fulfilled, (state) => {
      state.cart = initialState.cart;
    });
    builder.addCase(getCompleteCart.fulfilled, (state, { payload }) => {
      state.cart = payload.newCart;
    });
    builder.addCase(applyCoupon.fulfilled, (state, { payload }) => {
      state.cart.appliedCoupon = payload.coupon;
      state.cart.totalAmount = payload.newTotal;
    });
  },
});

export const userActions = userSlice.actions;

export default userSlice;
