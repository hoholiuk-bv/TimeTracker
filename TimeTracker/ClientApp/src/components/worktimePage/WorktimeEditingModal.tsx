import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormLabel, Row, Col, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { FormGroup } from '../common/elements/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { required } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import {WorktimeInput, WorktimeRecord} from '../../behavior/worktime/types';
import { requestWorktimeUpdate } from '../../behavior/worktime/actions';
import { RootState } from '../../behavior/store';
import { format } from 'date-fns';

type Props = {
  show: boolean;
  handleClose: () => void;
  worktimeRecord: WorktimeRecord;
}

export const WorktimeEditingModal = ({ show, handleClose, worktimeRecord }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.userInfo);

  if(user === null || worktimeRecord.finishDate === null)
    return null;

  const initialValues: WorktimeInput = {
    id: worktimeRecord.id,
    userId: worktimeRecord.userId,
    startDate: format(new Date(worktimeRecord.startDate), 'yyyy-MM-dd\'T\'HH:mm'),
    finishDate: format(new Date(worktimeRecord.finishDate), 'yyyy-MM-dd\'T\'HH:mm'),
    lastEditorId: user.id,
  };

  const onSubmit = (values: WorktimeInput) => {
    if (values.startDate && values.finishDate) {
      const startDate = new Date(values.startDate);
      const finishDate = new Date(values.finishDate);

      if (startDate < finishDate) {
        dispatch(requestWorktimeUpdate(values));
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Worktime editing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor="startDate">Start date</FormLabel>
                    <Field name="startDate" type="datetime-local" className="form-control" validate={required} />
                    <ValidationMessage fieldName='startDate' />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor="finishDate">Finish date</FormLabel>
                    <Field name="finishDate" type="datetime-local" className="form-control" validate={required} />
                    <ValidationMessage fieldName='finishDate' />
                  </FormGroup>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type='button' variant='secondary' onClick={handleClose}>Close</Button>
              <Button type='submit' onClick={handleClose}>Save</Button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
