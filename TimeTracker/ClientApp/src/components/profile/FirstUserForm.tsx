import React from 'react';
import { FormLabel } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { RegisterInput } from '../../behavior/profile/types';
import { useDispatch } from 'react-redux';
import { register } from '../../behavior/profile/actions';
import { required, email, validate, maxLength, minLength } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { FormGroup } from '../common/elements/FormGroup';

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
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        <Form>
          <h1 className="text-center mb-3">Create first user</h1>
          <FormGroup>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Field type="text"
              className="form-control text-box single-line"
              name="name"
              validate={validate(
                [
                  { validationFunction: required },
                  { validationFunction: maxLength, validationAttributes: { length: 128 } }
                ])} />
            <ValidationMessage fieldName='name' />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='surname'>Surname</FormLabel>
            <Field type="text"
              className="form-control text-box single-line"
              name="surname"
              validate={validate(
                [
                  { validationFunction: required },
                  { validationFunction: maxLength, validationAttributes: { length: 128 } }
                ])} />
            <ValidationMessage fieldName='surname' />
          </FormGroup>
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
                  { validationFunction: maxLength, validationAttributes: { length: 256 } }
                ])} />
            <ValidationMessage fieldName='email' />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Field type="password"
              className="form-control text-box single-line"
              name="password"
              validate={validate(
                [
                  { validationFunction: required },
                  { validationFunction: maxLength, validationAttributes: { length: 128 } },
                  { validationFunction: minLength, validationAttributes: { length: 6 } }
                ])} />
            <ValidationMessage fieldName='password' />
          </FormGroup>
          <button className="btn btn-primary w-100 mt-2" type="submit">Sign up</button>
        </Form>
      </Formik>
    </>
  );
};
