/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
  },
});

export const { setUserAuth } = authSlice.actions;

export default authSlice.reducer;