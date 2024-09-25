import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import {
  FormControl, FormGroup,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useGetMessagesQuery, useAddMessageMutation } from '../api/messagesApi';

const Messages = ({ messages }) => messages.map((message) => (
  <div className="text-break mb-2" key={message.id}>
    <b>{message.username}</b>
    :
    {' '}
    {message.body}
  </div>
));

const MessagesComponent = () => {
  const { t } = useTranslation();
  const { currentChannelName, currentChannelId } = useSelector((state) => state.app);
  const { username } = useSelector((state) => state.auth);
  const { data = [] } = useGetMessagesQuery();
  const currentChatMessages = data.filter((m) => m.channelId === currentChannelId);
  const [addMessage] = useAddMessageMutation();
  const messagesEndRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  filter.loadDictionary();

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = messagesEndRef.current;
    setIsAtBottom(scrollHeight === scrollTop + clientHeight);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [currentChatMessages, isAtBottom]);

  const handleFormSubmit = async ({ message }, { resetForm }) => {
    const cleanMessage = filter.clean(message);
    const payload = { body: cleanMessage, channelId: currentChannelId, username };
    await addMessage(payload);
    resetForm();
    scrollToBottom();
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {currentChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('chat.messageCount.message', { count: currentChatMessages.length })}
          </span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
          ref={messagesEndRef}
          onScroll={handleScroll}
        >
          <Messages
            messages={currentChatMessages}
          />
        </div>
        <div className="mt-auto px-5 py-3">
          <FormGroup className="mt-auto px-5 py-3">
            <Formik
              initialValues={{ message: '' }}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                handleChange,
              }) => (
                <Form noValidate className="py-1 border rounded-2">
                  <FormGroup className="input-group has-validation">
                    <FormControl
                      type="text"
                      name="message"
                      id="message"
                      value={values.message}
                      onChange={handleChange}
                      autoFocus
                      placeholder={t('chat.newMessagePlaceholder')}
                      aria-label={t('chat.newMessageInput')}
                    />
                    <button type="submit" className="btn btn-group-vertical">
                      <ArrowRightSquare size={20} />
                      <span className="visually-hidden">{t('chat.sendMessageBtn')}</span>
                    </button>
                  </FormGroup>
                </Form>
              )}
            </Formik>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
