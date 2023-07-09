import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { CreationInput } from '../../behavior/userCreation/types';
import { useDispatch } from 'react-redux';
import { userCreation } from '../../behavior/userCreation/actions';
import { email, maxLength, required, validate } from '../../behavior/validators';
import { ValidationMessage } from './ValidationMessage';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';

const initialValues: CreationInput = {
  name: null,
  surname: null,
  email: null,
  password: null,
  employmentType: null,
  employmentDate: null,
  isAdmin: null,
};

export const CreationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values: CreationInput) => {
    dispatch(userCreation(values)); navigate(routes.users.list);
  };
  return (
    <>
      {/* <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}> */}
      <div className="d-flex flex-wrap justify-content-center align-items-start p-4 border rounded-5">
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          <Form>
            <h1 className="mb-3">Creation Form</h1>
            <Row>
              <Col>
                <label>Name</label>
                <Field type="text" className="form-control mb-3" name="name" validate={required} />
                <ValidationMessage fieldName='name' />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Surname</label>
                <Field type="text" className="form-control mb-3" name="surname" validate={required} />
                <ValidationMessage fieldName='surname' />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Email</label>
                <Field type="email" className="form-control mb-3" name="email" validate={validate(
                  [
                    { validationFunction: required },
                    { validationFunction: email },
                    { validationFunction: maxLength, validationAttributes: { length: 256 } }
                  ])} />
                <ValidationMessage fieldName='email' />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Password</label>
                <Field type="password" className="form-control mb-3" name="password" validate={required} />
                <ValidationMessage fieldName='password' />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Employment type</label>
                <Field as="select" className="form-control mb-3" name="employmentType">
                  <option value="">Choose the employment type</option>
                  <option value={0}>Full time</option>
                  <option value={1}>Part time</option>
                </Field>
                <ValidationMessage fieldName='employmentType' />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Employment date</label>
                <Field name="employmentDate" type="date" className="form-control" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Admin user</label>
                <Field type="checkbox" name="isAdmin" />
              </Col>
            </Row>
            <Row>
              <Col>
                <button className="btn btn-primary w-100 mt-2" type="submit">Register</button>
              </Col>
            </Row>

          </Form>
        </Formik>
      </div>
      {/* </Container> */}
    </>
  );
};