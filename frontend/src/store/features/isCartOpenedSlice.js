import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpened: false,
};

export const IsCartOpenedSlice = createSlice({
  name: 'isCartOpened',
  initialState,
  reducers: {
    changeCartState: (state, action) => {
      state.isCartOpened = action.payload;
    },
   
  },
});

export default IsCartOpenedSlice.reducer;
export const { changeCartState } = IsCartOpenedSlice.actions;
