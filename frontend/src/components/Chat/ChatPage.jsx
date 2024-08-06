import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChatPage = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const auth = useAuth();

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <ChannelsComponent />
                <MessagesComponent />
            </div>
        </Container>
    );
}