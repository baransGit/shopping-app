import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./types";

const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
  total: 0,
  visibleItemCount: 3,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ productId, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
      }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
    clearItems: (state) => {
      state.items = [];
      state.total = 0;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearItems,
  setDrawerOpen,
} = cartSlice.actions;
export default cartSlice.reducer;
