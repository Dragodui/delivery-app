import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

export const OrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addItemToOrders: (state, action) => {
      state.orders.push(action.payload);
    },
    removeItemFromOrders: (state, action) => {
      const index = state.orders.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
    fillOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export default OrdersSlice.reducer;
export const { addItemToOrders, removeItemFromOrders, fillOrders } =
  OrdersSlice.actions;
