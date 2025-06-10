import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Используйте BASE_URL для удобства
const BASE_URL = 'http://35.159.168.248/api/auth';

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ email, password, confirmPassword, firstName }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/signUpForClient`, { email, password, confirmPassword, firstName });
            return response.data;
        } catch (error) {
            // Убедитесь, что error.response.data существует, прежде чем обращаться к message
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/signIn`, { email, password });
            return response.data;
        } catch (error) {
            // Убедитесь, что error.response.data существует
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Новый thunk для Google аутентификации
export const googleSignIn = createAsyncThunk(
    'auth/googleSignIn',
    async (idToken, { rejectWithValue }) => {
        try {
            // Как мы обсуждали, idToken передается как query-параметр
            const response = await axios.post(`${BASE_URL}/signInGoogle?idToken=${idToken}`);
            // Важно: в ответе ожидаем { id, token, role, email (опционально) }
            return response.data;
        } catch (error) {
            console.error('Error in googleSignIn thunk:', error.response?.data || error.message);
            // Возвращаем сообщение об ошибке от бэкенда или общее сообщение
            return rejectWithValue(error.response?.data?.message || 'Google Sign-In failed');
        }
    }
);