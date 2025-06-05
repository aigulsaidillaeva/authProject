import { createAsyncThunk,  } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL='http://35.159.168.248/api/auth'
export const registerUser=createAsyncThunk(
    'auth/register',
    async({email,password},{rejectedWithValue})=>{
        try {
            const response=await axios.post(`${BASE_URL}/signUpForClient`,{email,password,confirmPassword,firstName})
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data.message)
                 
        }
    }
)

export const loginUser=createAsyncThunk(
    'auth/login',
    async({email,password},{rejectedWithValue})=>{
        try {
            const response=await axios.post(`${BASE_URL}/signIn`,{email,password})
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data.message)
                 
        }
    }
)