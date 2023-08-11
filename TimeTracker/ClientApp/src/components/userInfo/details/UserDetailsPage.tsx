import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { receiveUser, requestUser } from '../../../behavior/userDetails/actions';
import { UserFormProps } from '../../../behavior/userCreation/types';
import { UserUpdateInput } from '../../../behavior/userDetails/types';
import { SelectElementOptions } from '../../../behavior/common/types';
import { ConfirmationModal } from './ConfirmationModal';
import { Alert } from 'react-bootstrap';
import { UserForm } from '../../userCreation/UserForm';
import { RootState } from '../../../behavior/store';

export const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userDetails);
  const [selectedApprovers, setSelectedApprovers] = useState<SelectElementOptions[]>([]);
  const [updateUserValues, setUpdateUserValues] = useState<UserUpdateInput | null>(null);
  const confirmationModalClose = () => setUpdateUserValues(null);
  const confirmationModalShow = (values: UserUpdateInput) => setUpdateUserValues(values);

  useEffect(() => {
    dispatch(receiveUser(null));
  }, [dispatch]);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(requestUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!user)
      return;

    const approverOptions: SelectElementOptions[] = user?.approvers.map((approver) => ({
      value: approver.id,
      label: approver.name + ' ' + approver.surname + ' (' + approver.email + ')'
    }));

    setSelectedApprovers(approverOptions);
  }, [user, setSelectedApprovers]);

  if (user === null)
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
    approversIdList: [],
    hours: Math.floor(user.workingHoursCount),
    minutes: Math.round((user.workingHoursCount % 1) * 100),
    daysOffCount: user.daysOffCount
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
      <UserForm properties={UserFormProperties} />
      <ConfirmationModal selectedApprovers={selectedApprovers} values={updateUserValues} handleClose={confirmationModalClose} />
    </>
  );
};
