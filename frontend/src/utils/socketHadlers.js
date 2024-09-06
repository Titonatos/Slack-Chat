import { toast } from 'react-toastify';
import i18next from 'i18next';
import store from './slices/index.js';
import { messagesApi } from './api/messagesApi.js';
import { channelsApi } from './api/channelsApi.js';

const i18n = i18next.createInstance();

const handleNewMessage = (newMessage) => {
  store.dispatch(
    messagesApi.util.updateQueryData(
      'getMessages',
      undefined,
      (draftMessages) => { draftMessages.push(newMessage); },
    ),
  );
};

const handleNewChannel = (newChannel) => {
  store.dispatch(
    channelsApi.util.updateQueryData(
      'getChannels',
      undefined,
      (draftChannels) => { draftChannels.push(newChannel); },
    ),
  );
  toast.success(i18n.t('chat.notify.addChannel'));
};

const handleRenameChannel = ({ id, name }) => {
  store.dispatch(
    channelsApi.util.updateQueryData(
      'getChannels',
      undefined,
      (draftChannels) => {
        const channelIndexToUpdate = draftChannels.findIndex((channel) => channel.id === id);
        const link = draftChannels;
        link[channelIndexToUpdate].name = name;
      },
    ),
  );
  toast.success(i18n.t('chat.notify.renameChannel'));
};

const handleDeleteChannel = ({ id }) => {
  store.dispatch(
    channelsApi.util.updateQueryData(
      'getChannels',
      undefined,
      (draft) => draft.filter((channel) => channel.id !== id),
    ),
  );
  toast.success(i18n.t('chat.notify.removeChannel'));
};

export default {
  handleNewMessage,
  handleNewChannel,
  handleRenameChannel,
  handleDeleteChannel,
};
