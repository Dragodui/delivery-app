import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menu: [],
};

export const MyResMenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.menu.push(action.payload);
    },
    removeItemFromCart: (state, action) => {
      const index = state.menu.findIndex(
        (item) => item._id === action.payload._id,
      );
      if (index !== -1) {
        state.menu.splice(index, 1);
      }
    },
    fillCart: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export default MyResMenuSlice.reducer;
export const { addItemToCart, removeItemFromCart, fillCart } =
  MyResMenuSlice.actions;
