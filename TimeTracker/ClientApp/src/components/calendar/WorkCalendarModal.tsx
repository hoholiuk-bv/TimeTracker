import React from 'react';
import { Modal } from 'react-bootstrap';
import { WorkCalendar } from './WorkCalendar';

type Props = {
  show: boolean;
  handleClose: () => void;
}

export const WorkCalendarModal = ({ show, handleClose }: Props) => {
  return (
    <>
      <Modal className='calendarRuleModal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Work calendar'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WorkCalendar className='calendar-full-size' />
        </Modal.Body>
      </Modal>
    </>
  );
};
