import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, googleSignIn } from "./authThunk";

const loadStateFromLocalStorage = () => {
  try {
    const serializedToken = localStorage.getItem('token');
    const serializedRole = localStorage.getItem('role');
    const serializedEmail = localStorage.getItem('email');
    const serializedUser = localStorage.getItem('user');

    if (serializedToken === null) {
      return undefined;
    }

    return {
      token: serializedToken,
      role: serializedRole || 'GUEST',
      email: serializedEmail,
      user: serializedUser ? JSON.parse(serializedUser) : null,
      isAuth: !!serializedToken,
    };
  } catch (e) {
    return undefined;
  }
};

const saveStateToLocalStorage = (token, role, email, user) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    if (email) localStorage.setItem('email', email);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
  }
};

const clearLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('user');
};

const preloadedState = loadStateFromLocalStorage();

const initialState = {
  role: preloadedState?.role || 'GUEST',
  email: preloadedState?.email || null,
  token: preloadedState?.token || null,
  isAuth: preloadedState?.isAuth || false,
  user: preloadedState?.user || null,
  isLoading: false,
  error: null,
  forgotPasswordStatus: 'idle',
  resetPasswordStatus: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.isAuth = false;
      state.role = 'GUEST';
      state.email = null;
      state.user = null;
      clearLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.user = { id: action.payload.id, role: action.payload.role, email: action.payload.email };
        saveStateToLocalStorage(state.token, state.role, state.email, state.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.user = { id: action.payload.id, role: action.payload.role, email: action.payload.email };
        saveStateToLocalStorage(state.token, state.role, state.email, state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.token = null;
        state.role = 'GUEST';
        state.email = null;
        state.user = null;
        clearLocalStorage();
      })
      .addCase(googleSignIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.email = action.payload.email || null;
        state.isAuth = true;
        state.user = { id: action.payload.id, role: action.payload.role, email: action.payload.email };
        saveStateToLocalStorage(state.token, state.role, state.email, state.user);
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.token = null;
        state.role = 'GUEST';
        state.email = null;
        state.user = null;
        clearLocalStorage();
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;