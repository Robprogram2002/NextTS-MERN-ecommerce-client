import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategories = createAsyncThunk('category/list', async () => {
  try {
    const response = await axios.get(`/categories/list`);
    if (response.status !== 200) throw new Error('something went wrong');

    return {
      categories: response.data,
    };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getCategory = createAsyncThunk(
  'categories/get-one',
  async (slug: string | string[]) => {
    try {
      const response = await axios.get(`/categories/${slug}`);
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        category: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const removeCategory = createAsyncThunk(
  'categories/delete-one',
  async (slug: string) => {
    try {
      const response = await axios.delete(`/categories/delete/${slug}`);
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        message: response.data.message,
        slug,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

interface UpdateCategoryPayload {
  slug: string | string[];
  category: string;
}

export const updateCategory = createAsyncThunk(
  'categories/update-one',
  async ({ slug, category }: UpdateCategoryPayload) => {
    try {
      const response = await axios.put(`/categories/update/${slug}`, {
        name: category,
      });
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        category: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (name: string) => {
    try {
      const response = await axios.post(`/categories/create`, { name });
      if (response.status !== 200) throw new Error('something went wrong');
      return {
        category: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
