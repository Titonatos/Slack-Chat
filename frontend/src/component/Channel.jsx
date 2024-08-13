import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActiveChannel, setChannelModal } from '../slices/appSlice.js';
import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentChannelName } = useSelector((state) => state.app);
  const payload = {
    id: channel.id,
    name: channel.name,
  };
  const handleDropDown = (modalType, dropDownChannel) => {
    dispatch(setChannelModal({ id: dropDownChannel.id, name: dropDownChannel.name, modalType }));
  };
  return (
    channel.removable ? (
      <Dropdown
        as={ButtonGroup}
        className="w-100"
      >
        <Button
          className="w-100 rounded-0 text-start text-truncate"
          variant={`${currentChannelName === channel.name ? 'secondary' : null}`}
          onClick={() => dispatch(setActiveChannel(payload))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
        <Dropdown.Toggle split variant={`${currentChannelName === channel.name ? 'secondary' : null}`} id={`dropdown-split-basic-${channel.id}`}>
          <span className="visually-hidden">{t('chat.manageChannel')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleDropDown('removing', channel)}>{t('chat.modals.deleteDropMenu')}</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDropDown('renaming', channel)}>{t('chat.modals.renameDropMenu')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <Button
        as={ButtonGroup}
        variant={`${currentChannelName === channel.name ? 'secondary' : null}`}
        className="w-100 text-start rounded-0 text-truncate"
        onClick={() => dispatch(setActiveChannel(payload))}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    )
  );
};

export default Channel;