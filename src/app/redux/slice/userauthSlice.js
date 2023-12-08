'use client'

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const token = Cookies.get('authtoken');

const userAuthSlice = createSlice({
  name: 'userauth',
  initialState: {
    user: null,
    authToken: String(token),
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user =  null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { getUser, setUser, clearUser, setLoading, setError } =
  userAuthSlice.actions;

export default userAuthSlice.reducer;
