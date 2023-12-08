'use client'

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const token = Cookies.get('authtoken');

const initialState = {
  isAuthenticated: !!token, 
  authToken: String(token) 
};

export const authSlice = createSlice({
  name: 'authslice',
  initialState,
  reducers: {
    UserSignIn: (state) => {
      state.isAuthenticated = true;
    },
    UserSignOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { UserSignIn, UserSignOut } = authSlice.actions;

export default authSlice.reducer;
