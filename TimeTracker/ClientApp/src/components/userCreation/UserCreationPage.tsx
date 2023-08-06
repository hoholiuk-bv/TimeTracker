import React, { useState } from 'react';
import type { UserCreationInput } from '../../behavior/userCreation/types';
import { useDispatch } from 'react-redux';
import { userCreation } from '../../behavior/userCreation/actions';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../behavior/routing';
import { MaxWorkingHours, SelectElementOptions } from '../../behavior/common/types';
import { UserFormProps } from '../../behavior/userCreation/types';
import { UserForm } from './UserForm';

export const UserCreationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedApprovers, setSelectedApprovers] = useState<SelectElementOptions[]>([]);

  const initialValues: UserCreationInput = {
    name: null,
    surname: null,
    email: null,
    password: null,
    employmentType: null,
    employmentDate: null,
    isAdmin: null,
    approversIdList : [],
    hours: null,
    minutes: null,
  };

  const onSubmit = (values: UserCreationInput) => {
    const { hours, minutes, ...otherValues } = values;
    const workingHoursCount = (hours ?? 0) + (minutes ?? 0) / 100;

    dispatch(userCreation({
      ...otherValues,
      approversIdList: selectedApprovers.map(options => options.value),
      workingHoursCount: (hours !== null && hours < MaxWorkingHours) ? workingHoursCount : MaxWorkingHours,
    }));

    navigate(routes.users.list);
  };

  const UserFormProperties: UserFormProps = {
    initialValues: initialValues,
    onSubmit: onSubmit,
    selectedApprovers: selectedApprovers,
    setSelectedApprovers: setSelectedApprovers,
  };

  return (
    <>
      <h1 className="mb-3">New user</h1>
      <UserForm properties={UserFormProperties} />
    </>
  );
};
