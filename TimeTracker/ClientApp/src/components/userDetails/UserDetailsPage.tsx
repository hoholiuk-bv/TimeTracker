import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { receiveUser, requestApprovers, requestUser } from '../../behavior/userDetails/actions';
import { UserFormProps } from '../../behavior/userCreation/types';
import { UserUpdateInput } from '../../behavior/userDetails/types';
import { SelectElementOptions } from '../../behavior/common/types';
import { ConfirmationModal } from './ConfirmationModal';
import { Alert } from 'react-bootstrap';
import { UserForm } from '../userCreation/UserForm';
import { routes } from '../../behavior/routing';
import { useNavigate } from 'react-router-dom';

export const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, approvers } = useSelector((state: RootState) => state.userDetails);
  const [selectedApprovers, setSelectedApprovers] = useState<SelectElementOptions[]>([]);
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
    const approverOptions: SelectElementOptions[] = approvers.map((approver) => ({
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

  const handleUserDaysOffButtonClick = () => navigate(routes.users.daysoff.replace(':id', user.id));

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <h1 className="mb-3">{user.name} {user.surname}</h1>
        <button onClick={handleUserDaysOffButtonClick} className="btn btn-primary">Days off</button>
      </div>
      <UserForm properties={UserFormProperties}/>
      <ConfirmationModal selectedApprovers={selectedApprovers} values={updateUserValues} handleClose={confirmationModalClose} />
    </>
  );
};
