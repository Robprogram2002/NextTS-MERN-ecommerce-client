import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, SubCategory } from '../../types/Category';
import {
  getCategories,
  createCategory,
  removeCategory,
  updateCategory,
  getSubCategories,
  createSub,
  getSub,
  removeSub,
  updateSub,
  getSubsByCategory,
} from './category_actions';

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  subCategories: SubCategory[];
  currentSubCategory: SubCategory | null;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  subCategories: [],
  currentSubCategory: null,
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

    // sub categories reducers
    builder.addCase(getSubCategories.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.subCategories = payload.subCategories;
    });
    builder.addCase(createSub.fulfilled, (state, { payload }) => {
      state.subCategories.splice(0, 0, payload.newSub);
    });
    builder.addCase(removeSub.fulfilled, (state, { payload }) => {
      state.subCategories = state.subCategories.filter(
        (sub) => sub.slug !== payload.slug
      );
    });
    builder.addCase(updateSub.fulfilled, (state, { payload }) => {
      const subCategoryIndex: number = state.subCategories.findIndex(
        (sub) => sub._id.toString() === payload.updatedSub._id.toString()
      );

      if (subCategoryIndex === -1) {
        return;
      }

      state.subCategories[subCategoryIndex] = payload.updatedSub;
    });
    builder.addCase(getSub.fulfilled, (state, { payload }) => {
      state.currentSubCategory = payload.subCategory;
    });
    builder.addCase(getSubsByCategory.fulfilled, (state, { payload }) => {
      console.log(payload.subs);
      state.subCategories = payload.subs;
    });
  },
});

export const categoryActions = categorySlice.actions;
export const getCategory = (slug: string | string[], categories: Category[]) =>
  categories.filter((category) => category.slug === slug)[0];

export default categorySlice;
