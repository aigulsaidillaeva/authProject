import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/authSlice";
export const stote=configureStore({
    reducer:{
        auth:reducer
    }
})