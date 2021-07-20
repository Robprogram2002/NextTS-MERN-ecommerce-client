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

// Sub categories actions

export const getSubCategories = createAsyncThunk(
  'sub-category/list',
  async () => {
    try {
      const response = await axios.get(`/subs/list`);
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        subCategories: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getSub = createAsyncThunk(
  'sub-categories/get-one',
  async (slug: string | string[]) => {
    try {
      const response = await axios.get(`/subs/${slug}`);
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        subCategory: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeSub = createAsyncThunk(
  'sub-categories/remove',
  async (slug: string | string[]) => {
    try {
      const response = await axios.delete(`/subs/remove/${slug}`);

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

interface UpdateSubPayload {
  slug: string | string[];
  sub: string;
  parent: string;
}

export const updateSub = createAsyncThunk(
  'sub-categories/update-sub',
  async ({ slug, sub, parent }: UpdateSubPayload) => {
    try {
      const response = await axios.put(`/subs/update/${slug}`, {
        name: sub,
        parent,
      });
      if (response.status !== 200) throw new Error('something went wrong');

      return {
        updatedSub: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

interface CreateSubPayload {
  sub: string;
  category: string;
}

export const createSub = createAsyncThunk(
  'sub-categories/create',
  async ({ sub, category }: CreateSubPayload) => {
    try {
      const response = await axios.post(`/subs/create`, {
        name: sub,
        parent: category,
      });

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        newSub: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getSubsByCategory = createAsyncThunk(
  'category/subcategories',
  async (_id: string) => {
    try {
      const response = await axios.get(`/categories/${_id}/subs`);

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        subs: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  'category/products',
  async (slug: string | string[]) => {
    try {
      const response = await axios.get(`/categories/${slug}/products`);

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        products: response.data,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getProductsBySub = createAsyncThunk(
  'sub-categories/products',
  async (slug: string | string[]) => {
    try {
      const response = await axios.get(`/subs/${slug}/products`);

      if (response.status !== 200) throw new Error('something went wrong');

      return {
        products: response.data.products,
        sub: response.data.sub,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
