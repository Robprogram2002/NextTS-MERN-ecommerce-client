import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/user_slice';
import appSlice from './app/app_slice';
import categorySlice from './category/category_slice';
import productSlice from './product/product_slice';

const store = configureStore({
  reducer: {
    userState: userSlice.reducer,
    appState: appSlice.reducer,
    categoryState: categorySlice.reducer,
    productState: productSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
