import React from 'react';
import { FormLabel } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { CreatePasswordInput } from '../../behavior/profile/types';
import { useDispatch, useSelector } from 'react-redux';
import { requestLogin } from '../../behavior/profile';
import { email, required, validate } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { RootState } from '../../behavior/store';
import { FormGroup } from '../common/elements/FormGroup';
import { requestPasswordCreation } from '../../behavior/profile/actions';

type Props = {
  token: string;
}

export const CreatePasswordForm = ({ token }: Props) => {
  const initialValues: CreatePasswordInput = {
    password: '',
    token,
  };

  const dispatch = useDispatch();
  const onSubmit = (values: CreatePasswordInput) => { dispatch(requestPasswordCreation({ password: values.password, token: values.token })); };

  return (
    <>
      <h1 className="text-center mb-3">Create your password</h1>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
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
              validate={required} />
            <ValidationMessage fieldName='confirmPassword' />
          </FormGroup>
          <button className="btn btn-primary w-100 mt-2" type="submit">Save</button>
        </Form>
      </Formik>
    </>
  );
};
