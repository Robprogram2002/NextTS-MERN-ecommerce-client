import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { removeImage, uploadImage } from '../images_actions';
import {
  getProductsByCount,
  createProduct,
  getProduct,
  updateProduct,
} from './product_actions';

interface ProductSliceState {
  imagesUploaded: any[] | null;
  currentProduct: Product | null;
  products: Product[] | null;
}

const initialState: ProductSliceState = {
  imagesUploaded: null,
  currentProduct: null,
  products: null,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<any[]>) => {
      state.imagesUploaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImage.fulfilled, (state, { payload }) => {
      if (state.imagesUploaded === null) {
        state.imagesUploaded = [payload.newFile];
      } else {
        state.imagesUploaded.push(payload.newFile);
      }
    });
    builder.addCase(removeImage.fulfilled, (state, { payload }) => {
      if (state.imagesUploaded) {
        state.imagesUploaded = state.imagesUploaded.filter(
          (image) => image.public_id !== payload.publicId
        );
      }
    });
    builder.addCase(getProductsByCount.fulfilled, (state, { payload }) => {
      state.products = payload.products;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.currentProduct = payload.product;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.imagesUploaded = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      state.imagesUploaded = null;
      state.currentProduct = null;

      if (state.products) {
        const index = state.products.findIndex(
          (product) => product._id.toString() === payload.product._id.toString()
        );

        state.products[index] = payload.product;
      }
    });
  },
});

export const productActions = productSlice.actions;

export default productSlice;
