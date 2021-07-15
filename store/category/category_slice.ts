import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/Category';
import {
  getCategories,
  createCategory,
  removeCategory,
  // getCategory,
  updateCategory,
} from './category_actions';

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.categories;
    });
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.categories.splice(0, 0, payload.category);
    });
    builder.addCase(removeCategory.fulfilled, (state, { payload }) => {
      state.categories = state.categories.filter(
        (category) => category.slug !== payload.slug
      );
    });
    builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
      const categoryIndex: number = state.categories.findIndex(
        (category) =>
          category._id.toString() === payload.category._id.toString()
      );

      if (categoryIndex === -1) {
        return;
      }

      state.categories[categoryIndex] = payload.category;
    });
  },
});

export const categoryActions = categorySlice.actions;
export const getCategory = (slug: string | string[], categories: Category[]) =>
  categories.filter((category) => category.slug === slug)[0];

export default categorySlice;
