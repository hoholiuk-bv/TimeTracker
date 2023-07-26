import React, { useEffect, useState } from 'react';
import { employmentType, employmentTypeForDisplay, User } from '../../behavior/users/types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { Field, Form, Formik } from 'formik';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { FormGroup } from '../common/elements/FormGroup';
import { email, maxLength, required, validate } from '../../behavior/validators';
import { ValidationMessage } from '../common/validation/ValidationMessage';
import { MaxWorkingHours } from '../../behavior/common/types';
import { receiveUser, requestApprovers, requestUser } from '../../behavior/userDetails/actions';
import { ApproverOptions } from '../../behavior/userCreation/types';
import { ApproversPicker } from '../creationForm/ApproversPicker';
import type { User as Approver } from '../../behavior/userCreation/types';
import { UpdateUserInput } from '../../behavior/userDetails/types';
import { ConfirmationModal } from './ConfirmationModal';
import { UserInfo } from '../../behavior/profile/types';

export const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUserInfo: UserInfo | null = useSelector((state: RootState) => state.profile.userInfo);
  const user: User | null = useSelector((state: RootState) => state.userDetails.details);
  const approvers: Approver[] = useSelector((state: RootState) => state.userDetails.approvers);
  const [selectedApprovers, setSelectedApprovers] = useState<ApproverOptions[]>([]);
  const [updateUserValues, setUpdateUserValues] = useState<UpdateUserInput | null>(null);
  const confirmationModalClose = () => setUpdateUserValues(null);
  const confirmationModalShow = (values: UpdateUserInput) => setUpdateUserValues(values);

  useEffect(() => {
    dispatch(receiveUser(null));
  }, [dispatch]);

  useEffect(() => {
    if(id !== undefined) {
      dispatch(requestUser(id));
      dispatch(requestApprovers(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const approverOptions: ApproverOptions[] = approvers.map((approver) => ({
      value: approver.id,
      label: approver.name + ' ' + approver.surname + ' (' + approver.email + ')'
    }));

    setSelectedApprovers(approverOptions);
  }, [approvers, setSelectedApprovers]);

  if(user === null)
    return (<div className="h5 alert alert-danger">User not found.</div>);

  const onSubmit = (values: UpdateUserInput) => {
    confirmationModalShow(values);
  };

  const initialValues: UpdateUserInput = {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    employmentType: user.employmentType,
    employmentDate: new Date(user.employmentDate).toLocaleDateString('en-CA'),
    isAdmin: user.isAdmin,
    isActive: user.isActive,
    approversIdList : [],
    hours: Math.floor(user.workingHoursCount),
    minutes: Math.round((user.workingHoursCount % 1) * 100),
  };

  return (
    <>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({values}) => (
          <Form>
            <h1 className="mb-3">{user.name} {user.surname}</h1>
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
              </Col>
              <Col>
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
                  <ApproversPicker selectedApprovers={selectedApprovers} setSelectedApprovers={setSelectedApprovers} excludeUserId={user.id}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="admin-checkbox-group mt-2 d-flex justify-content-end align-items-center gap-4">
                {currentUserInfo && currentUserInfo.id !== user.id && (
                  <>
                    <FormGroup>
                      <FormLabel htmlFor='isActive'>User is active</FormLabel>
                      <Field type="checkbox" name="isActive" id="isActive" />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel htmlFor='isAdmin'>Admin user</FormLabel>
                      <Field type="checkbox" name="isAdmin" id="isAdmin" />
                    </FormGroup>
                  </>
                )}
                <button className="btn btn-primary">Save</button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <ConfirmationModal selectedApprovers={selectedApprovers} values={updateUserValues} handleClose={confirmationModalClose} />
    </>
  );
};
