import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CalendarRuleInput, CalendarRuleType } from '../../behavior/calendar/types';
import { RuleForm } from './RuleForm';
import { useDispatch } from 'react-redux';
import { createCalendarRule, editCalendarRule } from '../../behavior/calendar/actions';
import { Form, Formik } from 'formik';

type Props = {
  show: boolean;
  handleClose: () => void;
  calendarRule: CalendarRuleInput | null;
}

export const RuleModal = ({ show, handleClose, calendarRule }: Props) => {

  const creationInitialValues: CalendarRuleInput = {
    title: '',
    isRecurring: false,
    type: CalendarRuleType.NonWorkingDay,
    startDate: null,
    finishDate: null,
    recurringFrequency: null,
    recurringPeriod: null,
    shortDayDuration: null,
    exceptions: [],
  };

  const isEditAction = calendarRule !== null;
  const dispatch = useDispatch();
  const handleSubmit = (values: CalendarRuleInput) => {
    dispatch(isEditAction ? editCalendarRule(values) : createCalendarRule(values));
  };

  return (
    <>
      <Modal className='calendarRuleModal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditAction ? 'Edit rule' : 'New rule'}</Modal.Title>
        </Modal.Header>
        <Formik initialValues={calendarRule ?? creationInitialValues} onSubmit={handleSubmit}>
          <Form>
            <Modal.Body>
              <RuleForm />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type='submit' onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
