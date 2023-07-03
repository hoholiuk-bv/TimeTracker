import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { requestFirstUserExistence } from '../../behavior/profile/actions';
import { routes } from '../../behavior/routing';
import { RootState } from '../../behavior/store';
import { FirstUserForm } from './FirstUserForm';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { firstUserExists } = useSelector((state: RootState) => state.profile);

  useEffect(() => { dispatch(requestFirstUserExistence()); }, [dispatch]);
  return (
    <>
      {localStorage.getItem('auth-token') && <Navigate to={routes.users} />}
      {firstUserExists ? <LoginForm /> : <FirstUserForm />}
    </>
  );
};