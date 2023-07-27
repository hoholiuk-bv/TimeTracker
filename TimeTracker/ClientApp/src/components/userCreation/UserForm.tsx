import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { email, maxLength, required, validate } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { FormGroup } from '../common/elements/FormGroup';
import { employmentType, employmentTypeForDisplay } from '../../behavior/users/types';
import { MaxWorkingHours } from '../../behavior/common/types';
import { ApproversPicker } from './ApproversPicker';
import { UserFormProps } from '../../behavior/userCreation/types';
import { UserUpdateInput } from '../../behavior/userDetails/types';
import { UserInfo } from '../../behavior/profile/types';
import { RootState } from '../../behavior/store';

type Props = {
  properties: UserFormProps;
}

export const UserForm = ({properties}: Props) => {
  const initialValues = properties.initialValues;
  const onSubmit = properties.onSubmit;
  const selectedApprovers = properties.selectedApprovers;
  const setSelectedApprovers = properties.setSelectedApprovers;
  const currentUserInfo: UserInfo | null = useSelector((state: RootState) => state.profile.userInfo);

  const isFormForUpdate = 'id' in initialValues;
  const updatedUserId = isFormForUpdate ? (properties.initialValues as UserUpdateInput).id : null;
  
  return (
    <>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({values}) => (
          <Form>
            <Row>
              <Col>
                <Row>
                  <FormGroup>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Field type="text" className="form-control" name="name" validate={required} />
                    <ValidationMessage fieldName='name' />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <FormLabel htmlFor='surname'>Surname</FormLabel>
                    <Field type="text" className="form-control" name="surname" validate={required} />
                    <ValidationMessage fieldName='surname' />
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <FormLabel htmlFor='employmentDate'>Employment date</FormLabel>
                    <Field name="employmentDate" type="date" className="form-control" validate={required} />
                    <ValidationMessage fieldName='employmentDate' />
                  </FormGroup>
                </Row>
              </Col>
              <Col>
                <Row>
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
                </Row>
                <Row>
                  {!isFormForUpdate && (
                    <FormGroup>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <Field type="password" className="form-control" name="password" validate={required} />
                      <ValidationMessage fieldName='password' />
                    </FormGroup>
                  )}
                </Row>
                <Row>
                  <FormGroup>
                    <FormLabel htmlFor='employmentType'>Employment type</FormLabel>
                    <Field as="select" className="form-control" name="employmentType" validate={required}>
                      <option value="">Choose the employment type</option>
                      {Object.keys(employmentType).map((type: string) => (
                        <option key={type} value={employmentType[type as keyof typeof employmentType]}>
                          {employmentTypeForDisplay[type as keyof typeof employmentTypeForDisplay]}
                        </option>
                      ))}
                    </Field>
                    <ValidationMessage fieldName='employmentType' />
                  </FormGroup>
                </Row>
                {values.employmentType && values.employmentType === employmentType.PartTime && (
                  <Row>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='hours'>Hours</FormLabel>
                        <Field type="number" className="form-control" name="hours" validate={required} min={1} max={MaxWorkingHours} />
                        <ValidationMessage fieldName='hours' />
                      </FormGroup>
                    </Col>
                    <Col>
                      {values.hours !== MaxWorkingHours && (
                        <FormGroup>
                          <FormLabel htmlFor='minutes'>Minutes</FormLabel>
                          <Field type="number" className="form-control" name="minutes" min={0} step={10} max={50} />
                        </FormGroup>
                      )}
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row>
              <Col className="approvers-group">
                <FormGroup>
                  <FormLabel htmlFor='approversIdList'>Approvers</FormLabel>
                  <ApproversPicker
                    selectedApprovers={selectedApprovers}
                    setSelectedApprovers={setSelectedApprovers}
                    excludeUserId={isFormForUpdate ? updatedUserId : null}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="admin-checkbox-group mt-2 d-flex justify-content-end align-items-center gap-4">
                {isFormForUpdate
                  ? (currentUserInfo && currentUserInfo.id !== updatedUserId) && (
                    <>
                      {isFormForUpdate && (
                        <FormGroup>
                          <FormLabel htmlFor='isActive'>User is active</FormLabel>
                          <Field type="checkbox" name="isActive" id="isActive" />
                        </FormGroup>
                      )}
                      <FormGroup>
                        <FormLabel htmlFor='isAdmin'>Admin user</FormLabel>
                        <Field type="checkbox" name="isAdmin" id="isAdmin" />
                      </FormGroup>
                    </>
                  ) : (
                    <>
                      <FormGroup>
                        <FormLabel htmlFor='isAdmin'>Admin user</FormLabel>
                        <Field type="checkbox" name="isAdmin" id="isAdmin" />
                      </FormGroup>
                    </>
                  )
                }
                <button className="btn btn-primary" type="submit">
                  {isFormForUpdate ? 'Save' : 'Create'}
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};
