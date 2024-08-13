import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import filter from 'leo-profanity';
import App from './component/App.jsx';
import store from './slices/index.js';
import resources from './locales/index.js';
import utils from './utils/socketHadlers.js';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  socket.connect();
  socket.on('newMessage', utils.handleNewMessage);
  socket.on('newChannel', utils.handleNewChannel);
  socket.on('renameChannel', utils.handleRenameChannel);
  socket.on('removeChannel', utils.handleDeleteChannel);

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