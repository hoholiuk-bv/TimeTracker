import React, { useEffect, useState } from 'react';
import { User } from '../../behavior/users/types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { receiveUser, requestApprovers, requestUser } from '../../behavior/userDetails/actions';
import {ApproverOptions, UserFormProps} from '../../behavior/userCreation/types';
import type { ApproverInfo as Approver } from '../../behavior/userCreation/types';
import { UserUpdateInput } from '../../behavior/userDetails/types';
import { ConfirmationModal } from './ConfirmationModal';
import { Alert } from 'react-bootstrap';
import { UserForm } from '../userCreation/UserForm';

export const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user: User | null = useSelector((state: RootState) => state.userDetails.details);
  const approvers: Approver[] = useSelector((state: RootState) => state.userDetails.approvers);
  const [selectedApprovers, setSelectedApprovers] = useState<ApproverOptions[]>([]);
  const [updateUserValues, setUpdateUserValues] = useState<UserUpdateInput | null>(null);
  const confirmationModalClose = () => setUpdateUserValues(null);
  const confirmationModalShow = (values: UserUpdateInput) => setUpdateUserValues(values);

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
    return (<Alert variant='secondary'>User not found.</Alert>);

  const initialValues: UserUpdateInput = {
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

  const onSubmit = (values: UserUpdateInput) => {
    confirmationModalShow(values);
  };

  const UserFormProperties: UserFormProps = {
    initialValues: initialValues,
    onSubmit: onSubmit,
    selectedApprovers: selectedApprovers,
    setSelectedApprovers: setSelectedApprovers,
  };

  return (
    <>
      <h1 className="mb-3">{user.name} {user.surname}</h1>
      <UserForm properties={UserFormProperties}/>
      <ConfirmationModal selectedApprovers={selectedApprovers} values={updateUserValues} handleClose={confirmationModalClose} />
    </>
  );
};
