import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./features/userSlice";
import { CartSlice } from "./features/cartSlice";
import { IsLoggedInSlice } from "./features/isLoggedInSlice";
import {IsCartOpenedSlice} from "./features/isCartOpenedSlice";

export const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        isLoggedInSlice: IsLoggedInSlice.reducer,
        cart: CartSlice.reducer,
        isCartOpened: IsCartOpenedSlice.reducer,
    }
})

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;