import React from 'react';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { LoginInput } from '../../behavior/profile/types';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../behavior/profile';
import { email, required, validate } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { RootState } from '../../behavior/store';
import { FormGroup } from '../common/elements/FormGroup';
import { GoogleLoginButton } from './GoogleLoginButton';

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
      <h1 className="text-center mb-3">Welcome back!</h1>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        <Form>
          {loginFailed && <div className='alert alert-danger'>Username or password is invalid</div>}
          <FormGroup>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Field
              type="text"
              className="form-control text-box single-line"
              name="email"
              validate={validate(
                [
                  { validationFunction: required },
                  { validationFunction: email },
                ])} />
            <ValidationMessage fieldName='email' />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Field type="password"
              className="form-control text-box single-line"
              name="password"
              validate={required} />
            <ValidationMessage fieldName='password' />
          </FormGroup>
          <button className="btn btn-primary w-100 mt-2 mb-2" type="submit">Log in</button>
        </Form>
      </Formik>
      <Row>
        <Col>
          <GoogleLoginButton />
        </Col>
        <Col>
          <a className='loginGithubButton' href="https://github.com/login/oauth/authorize?client_id=Iv1.bf82c0c7c72157f8">Login with GitHub</a>
        </Col>
      </Row>
    </>
  );
};
