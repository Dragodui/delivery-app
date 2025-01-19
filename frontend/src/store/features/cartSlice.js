import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    fillCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export default CartSlice.reducer;
export const { addItemToCart, removeItemFromCart, fillCart } =
  CartSlice.actions;
