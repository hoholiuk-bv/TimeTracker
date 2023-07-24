import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FormLabel, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { FormGroup } from '../common/elements/FormGroup';
import { DayOffRequestInput, DayOffRequestType } from '../../behavior/daysOff/types';
import { useDispatch } from 'react-redux';
import { requestDayOff } from '../../behavior/daysOff/actions';
import { required } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { DayOffRequestTypeNames } from '../../behavior/daysOff/helpers';

type Props = {
  show: boolean;
  handleClose: () => void;
}

export const NewRequestModal = ({ show, handleClose }: Props) => {

  const initialValues: DayOffRequestInput = {
    startDate: '',
    finishDate: '',
    reason: DayOffRequestType.Vacation,
  };

  const dispatch = useDispatch();
  const onSubmit = (values: DayOffRequestInput) => { dispatch(requestDayOff(values)); };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Request a day off</Modal.Title>
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
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button className="btn btn-primary" type="submit" onClick={handleClose}>Save</button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
