import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ChannelsComponent = () => {



    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                <li className="nav-item w-100">
                    <button className='w-100 rounded-0 text-start btn btn-secondary'>
                        <span className='me-1'>#</span>
                        'general'
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default ChannelsComponent;