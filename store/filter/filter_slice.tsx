import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getProductsByCount } from '../product/product_actions';
import { fetchProductsByFilter } from './filter_actions';

interface filterSliceState {
  query: string | null;
  star: number | null;
  category: string[] | null;
  subCategory: string | null;
  color: string | null;
  brand: string | null;
  shipping: string | null;
  price: [number, number];
  filteredProducts: Product[] | null;
  loading: boolean;
}

const initialState: filterSliceState = {
  query: null,
  star: null,
  category: null,
  subCategory: null,
  color: null,
  brand: null,
  shipping: null,
  price: [0, 0],
  filteredProducts: null,
  loading: false,
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<[number, number]>) => {
      state.price = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload;
    },
    setStar: (state, action: PayloadAction<number>) => {
      state.star = action.payload;
    },
    setSub: (state, action: PayloadAction<string>) => {
      state.subCategory = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsByFilter.fulfilled, (state, { payload }) => {
      state.filteredProducts = payload.products;
      state.loading = false;
    });
    builder.addCase(getProductsByCount.fulfilled, (state, { payload }) => {
      state.filteredProducts = payload.products;
      state.loading = false;
    });
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice;
