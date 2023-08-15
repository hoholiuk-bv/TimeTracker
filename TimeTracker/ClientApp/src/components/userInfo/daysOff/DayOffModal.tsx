import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormLabel, Row, Col, Button } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { Form as FormikForm } from 'formik';
import Form from 'react-bootstrap/Form';
import { FormGroup } from '../../common/elements/FormGroup';
import { DayOffRequestInput, DayOffRequestReason } from '../../../behavior/daysOff/types';
import { useDispatch } from 'react-redux';
import { requestDayOff } from '../../../behavior/daysOff/actions';
import { required } from '../../../behavior/validators';
import { ValidationMessage } from '../../common/validation/ValidationMessage';

type Props = {
  show: boolean;
  handleClose: () => void;
  userId: string;
}

export const DayOffModal = ({ show, handleClose, userId }: Props) => {

  const initialValues: DayOffRequestInput = {
    startDate: '',
    finishDate: '',
    reason: DayOffRequestReason.Absence,
  };

  const dispatch = useDispatch();
  const onSubmit = (values: DayOffRequestInput) => { dispatch(requestDayOff(values, userId)); };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <FormikForm>
            <Modal.Header closeButton>
              <Modal.Title>Create a day off</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor="startDate">Beginning on</FormLabel>
                    <Field name="startDate" type="date" className="form-control" validate={required} />
                    <ValidationMessage fieldName='startDate' />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor="finishDate">Ending on</FormLabel>
                    <Field name="finishDate" type="date" className="form-control" validate={required} />
                    <ValidationMessage fieldName='endDate' />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel>Reason</FormLabel>
                    <Field as={Form.Select} name="reason">
                      <option value={DayOffRequestReason.Absence}>Absence</option>
                      <option value={DayOffRequestReason.SickLeave}>Sick leave</option>
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type='button' variant='secondary' onClick={handleClose}>Close</Button>
              <Button type='submit' onClick={handleClose}>Save</Button>
            </Modal.Footer>
          </FormikForm>
        </Formik>
      </Modal>
    </>
  );
};
