// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  firstName: '',
  lastName: '',
  email: '',
  designation: '',
  phoneNumber: '',
  avatar: '',
  id: '',
}

const initialState = {
  user: initialUserState,
  loaded: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.loaded = true;
    },
    logout: (state) => {
      state.user = initialUserState;
      state.loaded = false;
    },
    loader: (state, action) => {
      state.loaded = action.payload;
    }
  },
});

export const { login, logout, loader } = authSlice.actions;

export default authSlice.reducer;
