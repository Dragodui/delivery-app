import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./features/userSlice";
import { IsLoggedInSlice } from "./features/isLoggedInSlice";

export const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        isLoggedInSlice: IsLoggedInSlice.reducer,
        
    }
})

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;