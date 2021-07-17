import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProduct = createAsyncThunk(
  'products/create',
  async ({ product, images }: any) => {
    try {
      const response = await axios.post(`/products/create`, {
        ...product,
        images,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newProduct: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getProductsByCount = createAsyncThunk(
  'products/list',
  async (count: number) => {
    try {
      const response = await axios.get(`/products/list/${count}`);

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        products: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'products/remove',
  async (slug: string) => {
    try {
      const response = await axios.delete(`/products/remove/${slug}`);

      if (response.status !== 200) throw new Error('something went wrong');

      const { message, product } = response.data;

      return {
        message,
        product,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  'products/get-one',
  async (slug: string | string[]) => {
    try {
      const response = await axios.get(`/products/${slug}`);

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        product: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

interface UpdateProductPayload {
  slug: string | string[];
  product: any;
  images: string[] | null;
}

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ slug, product, images }: UpdateProductPayload) => {
    try {
      const response = await axios.put(`/products/update/${slug}`, {
        ...product,
        images,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        product: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

interface GetSelectedProductsPayload {
  order: string;
  sort: string;
  page: number;
}

export const getSelectedProducts = createAsyncThunk(
  'products/get-sellected',
  async ({ order, sort, page }: GetSelectedProductsPayload) => {
    try {
      console.log(order, sort, page);
      const response = await axios.get(`/products/selected`, {
        params: {
          order,
          sort,
          page,
        },
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        products: response.data,
        sort,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
