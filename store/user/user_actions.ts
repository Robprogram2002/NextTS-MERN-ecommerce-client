import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cart } from '../../types/Cart';
import { Product } from '../../types/Product';

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
      message: response.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addProductToCart = createAsyncThunk(
  'user-cart/add-product',
  async (product: Product) => {
    try {
      const response = await axios.post('user/cart/add-product', { product });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newCart: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getCompleteCart = createAsyncThunk('user-cart/fetch', async () => {
  try {
    const response = await axios.get('user/cart/');

    if (response.status !== 200) throw new Error('something went wrong');

    return {
      newCart: response.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

interface changeProductColorPayload {
  productId: string;
  color: string;
}

export const changeProductColor = createAsyncThunk(
  'user-cart/products/change-color',
  async ({ productId, color }: changeProductColorPayload) => {
    try {
      const response = await axios.patch('/user/cart/products/change-color', {
        productId,
        color,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        updatedCart: response.data,
        productId,
        color,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const emptyUserCart = createAsyncThunk('user-cart/empty', async () => {
  try {
    const response = await axios.patch('/user/cart/empty');
    if (response.status !== 200) throw new Error('something went wrong');

    return {
      message: response.data.message,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const saveUserAddress = createAsyncThunk(
  'user-address/save',
  async (address: string) => {
    try {
      const response = await axios.post('/user/cart/add-address', {
        address,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        message: response.data.message,
        address,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const applyCoupon = createAsyncThunk(
  'user-cart/apply-coupon',
  async (coupon: string) => {
    try {
      const response = await axios.patch('/user/cart/apply-coupon', { coupon });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newTotal: response.data,
        coupon,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'user-cart/remove-product',
  async (productId: string) => {
    try {
      const response = await axios.patch('/user/cart/products/remove', {
        productId,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newCart: response.data,
        productId,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

interface changeProductCountPayload {
  productId: string;
  count: number;
}

export const changeProductCount = createAsyncThunk(
  'user-cart/products/change-product-count',
  async ({ productId, count }: changeProductCountPayload) => {
    try {
      const response = await axios.patch('/user/cart/products/change-count', {
        productId,
        count,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newCart: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

interface createOrderPayload {
  stripeResponse: any;
  completeCart: Cart;
}

export const createOrder = createAsyncThunk(
  'user-cart/create-order',
  async ({ stripeResponse, completeCart }: createOrderPayload) => {
    try {
      const response = await axios.post('/user/cart/create-order', {
        stripeResponse,
        completeCart,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        status: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
