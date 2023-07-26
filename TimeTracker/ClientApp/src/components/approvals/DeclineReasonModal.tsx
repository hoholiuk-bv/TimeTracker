import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { FormGroup } from '../common/elements/FormGroup';
import { maxLength, required, validate } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { DayOffApprovalStatus } from '../../behavior/common/types';

type FormValues = {
  declineReason: string;
}

type Props = {
  show: boolean;
  handleClose: () => void;
  handleStatusChange: (status: DayOffApprovalStatus, declineReason?: string) => void;
}

const initialValues: FormValues = {
  declineReason: '',
};

export const DeclineReasonModal = ({ show, handleClose, handleStatusChange }: Props) => {
  const onSubmit = (values: FormValues) => { handleApprovalDecline(values.declineReason); };

  const handleApprovalDecline = (declineReason: string) => {
    handleClose();
    handleStatusChange(DayOffApprovalStatus.Declined, declineReason);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Specify a reason to decline</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <FormGroup>
                    <Field name="declineReason" as="textarea" rows={5} className="form-control"
                      validate={validate(
                        [
                          { validationFunction: required },
                          { validationFunction: maxLength, validationAttributes: { length: 256 } }
                        ])} />
                    <ValidationMessage fieldName='declineReason' />
                  </FormGroup>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>Close</button>
              <button className="btn btn-primary" type="submit">Save</button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
