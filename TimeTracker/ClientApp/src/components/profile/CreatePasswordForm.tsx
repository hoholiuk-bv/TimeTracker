import React from 'react';
import { FormLabel } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { CreatePasswordInput } from '../../behavior/profile/types';
import { useDispatch } from 'react-redux';
import { required, validate, confirmationPassword } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { FormGroup } from '../common/elements/FormGroup';
import { requestPasswordCreation } from '../../behavior/profile/actions';

type Props = {
  token: string;
}

export const CreatePasswordForm = ({ token }: Props) => {
  const initialValues: CreatePasswordInput = {
    password: '',
    confirmPassword: '',
    token,
  };

  const dispatch = useDispatch();
  const onSubmit = (values: CreatePasswordInput) => { dispatch(requestPasswordCreation(values)); };

  return (
    <>
      <h1 className="text-center mb-3">Create your password</h1>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ values }) => (
          <Form>
            {/* {loginFailed && <div className='alert alert-danger'>Username or password is invalid</div>} */}
            <FormGroup>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Field
                type="password"
                className="form-control text-box single-line"
                name="password"
                validate={required} />
              <ValidationMessage fieldName='password' />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor='confirmPassword'>Confirm password</FormLabel>
              <Field type="password"
                className="form-control text-box single-line"
                name="confirmPassword"
                validate={validate(
                  [
                    { validationFunction: required },
                    { validationFunction: confirmationPassword, validationAttributes: {valueToCompare: values.password}},
                  ])} />
              <ValidationMessage fieldName='confirmPassword' />
            </FormGroup>
            <button className="btn btn-primary w-100 mt-2" type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
