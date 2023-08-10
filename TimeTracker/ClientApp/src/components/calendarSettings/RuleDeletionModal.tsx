import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteCalendarRule } from '../../behavior/calendar/actions';

type Props = {
  show: boolean;
  handleClose: () => void;
  ruleId: string;
}

export const RuleDeletionModal = ({ show, handleClose, ruleId }: Props) => {

  const dispatch = useDispatch();

  const handleRequestDelete = () => {
    handleClose();
    dispatch(deleteCalendarRule(ruleId));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this rule?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button type='button' variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button type='submit' onClick={handleRequestDelete}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
