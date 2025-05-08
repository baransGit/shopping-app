import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../features/product/slice";
import cartReducer from "../../features/cart/slice";
import authReducer from "../../features/auth/slice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
