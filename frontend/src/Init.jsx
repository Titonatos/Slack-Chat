import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messagesApi } from './api/messagesApi.js';
import { channelsApi } from './api/channelsApi.js';
import App from './component/App.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { setActiveChannel } from './slices/appSlice.js';

/* eslint-disable react/destructuring-assignment */

const Init = async (socket) => {
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: 'ru',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

  const rollbarConfig = {
    accessToken: process.env.RollBar_Token,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.RollBar_App_Environment,
  };

  filter.loadDictionary('ru');

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
    const defaultChannel = { id: '1', name: 'general' };
    store.dispatch(setActiveChannel(defaultChannel));
    toast.success(i18n.t('chat.notify.removeChannel'));
  };

  socket.connect();
  socket.on('newMessage', handleNewMessage);
  socket.on('newChannel', handleNewChannel);
  socket.on('renameChannel', handleRenameChannel);
  socket.on('removeChannel', handleDeleteChannel);

  return (
    <Provider store={store}>
      <React.StrictMode>
        <RollBarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ErrorBoundary>
        </RollBarProvider>
      </React.StrictMode>
    </Provider>
  );
};

export default Init;
