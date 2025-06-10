import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/authSlice";
export const store=configureStore({
    reducer:{
        auth:reducer
    }
})