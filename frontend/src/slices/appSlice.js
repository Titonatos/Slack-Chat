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
    setDefaultChannel: (state, { payload: { id } }) => {
      if (state.currentChannelId === id) {
        const defaultChannel = { id: '1', name: 'general' };
        state.currentChannelId = defaultChannel.id;
        state.currentChannelName = defaultChannel.name;
      }
    },
  },
});

export const {
  setActiveChannel, setChannelModal, setDefaultChannel,
} = appSlice.actions;
export default appSlice.reducer;
