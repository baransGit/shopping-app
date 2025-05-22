import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../features/product/slice";
import cartReducer from "../../features/cart/slice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
