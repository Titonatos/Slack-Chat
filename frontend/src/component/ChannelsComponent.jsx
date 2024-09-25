import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusSquare } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import { setChannelModal } from '../slices/appSlice.js';
import { useGetChannelsQuery } from '../api/channelsApi.js';
import BasicModal from '../modals/index.js';
import Channel from './Channel.jsx';

const ChannelsComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data: channels = [] } = useGetChannelsQuery();

  const channelsEndRef = useRef(null);
  const currentChannelId = useSelector((state) => state.app.currentChannelId);

  const channelRefs = useRef({});

  const handleAddingChannel = (type) => {
    const payload = {
      id: '',
      name: '',
      modalType: type,
    };
    dispatch(setChannelModal(payload));
  };

  useEffect(() => {
    const scrollToCurrentChannel = () => {
      if (currentChannelId && channelRefs.current[currentChannelId]) {
        channelRefs.current[currentChannelId].scrollIntoView({ behavior: 'smooth' });
      }
    };

    const timeoutId = setTimeout(scrollToCurrentChannel, 100);

    return () => clearTimeout(timeoutId);
  }, [currentChannelId, channels]);

  const renderModal = () => {
    const Component = BasicModal;
    return <Component />;
  };

  const ulClass = `nav flex-column nav-pills nav-fill 
  px-2 mb-3 overflow-auto h-100 d-block`;

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleAddingChannel('adding')}
        >
          <BsPlusSquare />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul className={ulClass} ref={channelsEndRef}>
        {
          channels.map((item) => (
            <li
              key={item.id}
              className="nav-item w-100"
              ref={(el) => { channelRefs.current[item.id] = el; }}
            >
              <Channel channel={item} />
            </li>
          ))
        }
      </ul>
      {renderModal()}
      <ToastContainer />
    </div>
  );
};

export default ChannelsComponent;
