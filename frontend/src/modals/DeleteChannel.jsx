import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useRemoveChannelMutation } from '../api/channelsApi';
import { setDefaultChannel } from '../slices/appSlice.js';

const DeleteChannel = ({
  onHide,
  modalType,
  modalId,
  dispatch,
}) => {
  const { t } = useTranslation();
  const [removeChannelById] = useRemoveChannelMutation();
  const handleFormSubmit = async () => {
    await removeChannelById(modalId);
    dispatch(setDefaultChannel(modalId));
    onHide();
  };

  return (
    <Modal show={modalType === 'removing'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.deleteChannelHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={modalId}
        >
          {() => (
            <Form>
              <p>{t('chat.modals.deleteChannelBody')}</p>
              <div className="d-flex justify-content-end mt-2">
                <Button type="button" variant="secondary" onClick={onHide} className="me-2">{t('chat.modals.declineButton')}</Button>
                <Button type="submit" variant="danger">{t('chat.modals.deleteButton')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannel;
