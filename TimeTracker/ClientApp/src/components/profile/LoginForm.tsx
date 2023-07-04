import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { LoginInput } from '../../behavior/profile/types';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../behavior/profile';
import { required } from '../../behavior/validators';
import { ValidationMessage } from './ValidationMessage';
import { RootState } from '../../behavior/store';

export const LoginForm = () => {
  const initialValues: LoginInput = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const onSubmit = (values: LoginInput) => { dispatch(requestLogin(values)); };
  const { loginFailed } = useSelector((state: RootState) => state.profile);

  return (
    <>
      <Container className="login-form">
        <h1 className="mt-5 mb-3">Login</h1>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            {loginFailed && <div className='alert alert-danger'>Username or password is invalid</div>}
            <Row>
              <Col>
                <Field type="text" className="form-control text-box single-line" placeholder="Email" name="email" validate={required} />
                <ValidationMessage fieldName='email' />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field type="password" className="form-control text-box single-line mt-2" placeholder="Password" name="password" validate={required} />
                <ValidationMessage fieldName='password' />
              </Col>
            </Row>
            <Row>
              <Col>
                <button className="btn btn-primary w-100 mt-2" type="submit">Log in</button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </Container>
    </>
  );
};
