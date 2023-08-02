import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteDayOffRequest } from '../../behavior/daysOff/actions';

type Props = {
  show: boolean;
  handleClose: () => void;
  requestId: string;
}

export const DeleteRequestModal = ({ show, handleClose, requestId }: Props) => {

  const dispatch = useDispatch();

  const handleRequestDelete = () => {
    handleClose();
    dispatch(deleteDayOffRequest(requestId));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this request?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button type='button' variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={handleRequestDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
