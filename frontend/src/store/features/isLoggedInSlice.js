import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

export const IsLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default IsLoggedInSlice.reducer;
export const { setIsLoggedIn } = IsLoggedInSlice.actions;
