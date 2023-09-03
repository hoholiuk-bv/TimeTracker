import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup } from '../common/elements/FormGroup';
import { required } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { Formik, Form, Field } from 'formik';
import { changeUserPassword, resetPasswordChangeStatus } from '../../behavior/users/actions';
import { RootState } from '../../behavior/store';

type Props = {
  show: boolean;
  handleClose: () => void;
}

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const ChangePasswordModal = ({ show, handleClose }: Props) => {
  const { isPasswordChanged } = useSelector((state: RootState) => state.users);
  const [alert, setAlert] = useState<string | null>(null);
  const dispatch = useDispatch();

  const initialValues: FormValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const onSubmit = (values: FormValues) => {
    if (values.newPassword === values.confirmNewPassword) {
      dispatch(changeUserPassword(values.oldPassword, values.newPassword));
    } else {
      setAlert('New password are not matching');
    }
  };

  useEffect(() => {
    if (isPasswordChanged) {
      handleClosePasswordModal();
    } else if (isPasswordChanged === false) {
      setAlert('Password update failed');
    }

    if (isPasswordChanged !== null) {
      dispatch(resetPasswordChangeStatus());
    }
  }, [isPasswordChanged]);

  const handleClosePasswordModal = () => {
    setAlert(null);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClosePasswordModal} backdrop="static" centered>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <Modal.Header closeButton className="pe-4">
              <Modal.Title>
                <span>Change Password</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor='oldPassword'>Old password</FormLabel>
                    <Field type="password" name="oldPassword" className="form-control" validate={required} />
                    <ValidationMessage fieldName='oldPassword' />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor='newPassword'>New password</FormLabel>
                    <Field type="password" name="newPassword" className="form-control" validate={required} />
                    <ValidationMessage fieldName='newPassword' />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor='confirmNewPassword'>Confirm new password</FormLabel>
                    <Field type="password" name="confirmNewPassword" className="form-control" validate={required} />
                    <ValidationMessage fieldName='confirmNewPassword' />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  {alert && (
                    <div className="alert alert-danger mt-1">{alert}</div>
                  )}
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" type="button" onClick={handleClosePasswordModal}>Close</button>
              <button className="btn btn-primary" type="submit">Change</button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};
