import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { RegisterInput } from '../../behavior/profile/types';
import { useDispatch } from 'react-redux';
import { register } from '../../behavior/profile/actions';
import { required } from '../../behavior/validators';
import { ValidationMessage } from './ValidationMessage';

const initialValues: RegisterInput = {
  name: null,
  surname: null,
  email: null,
  password: null,
};

export const FirstUserForm = () => {
  const dispatch = useDispatch();
  const onSubmit = (values: RegisterInput) => { dispatch(register(values)); };
  return (
    <>
      <Container className="login-form">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <h1 className="mt-5 mb-3">Register</h1>
            <Row>
              <Col>
                <Field type="text" className="form-control text-box single-line" placeholder="Name" name="name" validate={required}/>
                <ValidationMessage fieldName='name'/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Field type="text" className="form-control text-box single-line mt-2" placeholder="Surname" name="surname" validate={required}/>
                <ValidationMessage fieldName='surname'/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Field type="text" className="form-control text-box single-line mt-2" placeholder="Email" name="email" validate={required}/>
                <ValidationMessage fieldName='email'/>
              </Col>
            </Row>
            <Row>
              <Col>
                <Field type="password" className="form-control text-box single-line mt-2" placeholder="Password" name="password" validate={required}/>
                <ValidationMessage fieldName='password'/>
              </Col>
            </Row>
            <Row>
              <Col>
                <button className="btn btn-primary w-100 mt-2" type="submit">Register</button>
              </Col>
            </Row>
          </Form>
        </Formik>
      </Container>
    </>
  );
};