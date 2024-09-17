/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: '1',
  currentChannelName: 'general',
  modalChannelId: '',
  modalChannelName: '',
  modalType: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload: { id, name } }) => {
      state.currentChannelId = id;
      state.currentChannelName = name;
    },
    setChannelModal: (state, { payload: { id, name, modalType } }) => {
      state.modalChannelId = id;
      state.modalChannelName = name;
      state.modalType = modalType;
    },
  },
});

export const {
  setActiveChannel, setChannelModal,
} = appSlice.actions;
export default appSlice.reducer;
