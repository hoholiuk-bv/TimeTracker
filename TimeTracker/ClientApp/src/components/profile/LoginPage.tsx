import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { requestAuthentication, requestFirstUserExistence } from '../../behavior/profile/actions';
import { routes } from '../../behavior/routing';
import { RootState } from '../../behavior/store';
import { FirstUserForm } from './FirstUserForm';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { authenticated, firstUserExists } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (authenticated == null)
      dispatch(requestAuthentication());
    else if (authenticated === false)
      dispatch(requestFirstUserExistence());
  }, [dispatch, authenticated]);

  if (authenticated == null || firstUserExists == null)
    return null;

  if (authenticated)
    return (<Navigate to={routes.users} />);

  return (
    <>
      {firstUserExists ? <LoginForm /> : <FirstUserForm />}
    </>
  );
};
