import React, { useEffect, useState } from 'react';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import type { CreationInput } from '../../behavior/userCreation/types';
import { useDispatch, useSelector } from 'react-redux';
import { userCreation, requestUserList } from '../../behavior/userCreation/actions';
import { email, maxLength, required, validate } from '../../behavior/validators';
import { ValidationMessage } from './ValidationMessage';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';
import { FormGroup } from '../common/elements/FormGroup';
import { RootState } from '../../behavior/store';
import Select from 'react-select';

const initialValues: CreationInput = {
  name: null,
  surname: null,
  email: null,
  password: null,
  employmentType: null,
  employmentDate: null,
  isAdmin: null,
  approversIdList : [],
};

type ApproverOptions = {
  value: string,
  label: string
}

export const CreationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state: RootState) => state.userCreation.list);
  const [selectedApprovers, setSelectedApprovers] = useState<ApproverOptions[]>([]);
  const approversOptions: ApproverOptions[] = userList.map(user => ({
    value: user.id,
    label: user.name + ' ' + user.surname
  }));

  useEffect(() => {
    dispatch(requestUserList());
  }, [dispatch]);

  const onSubmit = (values: CreationInput) => {
    dispatch(userCreation({
      ...values,
      approversIdList: selectedApprovers.map(options => options.value)
    }));
    navigate(routes.users.list);
  };

  const handleApproversChange = (selectedOptions: any) => {
    setSelectedApprovers(selectedOptions);
  };

  return (
    <>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        <Form>
          <h1 className="mb-3">New user</h1>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Field type="text" className="form-control" name="name" validate={required} />
                <ValidationMessage fieldName='name' />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='employmentType'>Employment type</FormLabel>
                <Field as="select" className="form-control" name="employmentType" validate={required}>
                  <option value="">Choose the employment type</option>
                  <option value={0}>Full time</option>
                  <option value={1}>Part time</option>
                </Field>
                <ValidationMessage fieldName='employmentType' />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='surname'>Surname</FormLabel>
                <Field type="text" className="form-control" name="surname" validate={required} />
                <ValidationMessage fieldName='surname' />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='employmentDate'>Employment date</FormLabel>
                <Field name="employmentDate" type="date" className="form-control" validate={required} />
                <ValidationMessage fieldName='employmentDate' />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Field type="email" className="form-control" name="email" validate={validate(
                  [
                    { validationFunction: required },
                    { validationFunction: email },
                    { validationFunction: maxLength, validationAttributes: { length: 256 } }
                  ])} />
                <ValidationMessage fieldName='email' />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='approversIdList'>Approvers</FormLabel>
                <Select
                  isMulti
                  name="approversIdList"
                  options={approversOptions}
                  value={selectedApprovers}
                  onChange={handleApproversChange}
                  className="approvers-picker"
                  placeholder=""
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Field type="password" className="form-control" name="password" validate={required} />
                <ValidationMessage fieldName='password' />
              </FormGroup>
            </Col>
            <Col className="admin-checkbox-group">
              <FormGroup>
                <FormLabel htmlFor='isAdmin'>Admin user</FormLabel>
                <Field type="checkbox" name="isAdmin" id="isAdmin" />
              </FormGroup>
            </Col>
          </Row>
          <button className="btn btn-primary mt-2" type="submit">Create</button>
        </Form>
      </Formik>
    </>
  );
};
