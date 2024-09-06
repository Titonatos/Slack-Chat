import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BsPlusSquare } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import { setChannelModal } from '../slices/appSlice.js';
import { useGetChannelsQuery } from '../api/channelsApi.js';
import BasicModal from '../modals/index.js';
import Channel from './Channel.jsx';

const ChannelsComponent = () => {
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const ulClass = `nav flex-column nav-pills nav-fill 
  px-2 mb-3 overflow-auto h-100 d-block`;
  const dispatch = useDispatch();
  const handleAddingChannel = (type) => {
    const payload = {
      id: '',
      name: '',
      modalType: type,
    };
    dispatch(setChannelModal(payload));
  };
  const renderModal = () => {
    const Component = BasicModal;
    return <Component />;
  };

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
      <ul className={ulClass}>
        {
          channels.map((item) => (
            <li key={item.id} className="nav-item w-100">
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
