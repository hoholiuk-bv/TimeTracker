import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestFirstUserExistence } from '../../behavior/profile/actions';
import { RootState } from '../../behavior/store';
import { FirstUserForm } from './FirstUserForm';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const firstUserExists = useSelector((state: RootState) => state.profile.firstUserExists);
  useEffect(() => { dispatch(requestFirstUserExistence()); }, [dispatch]);
  return (
    <>
      {firstUserExists ? <LoginForm/> : <FirstUserForm/>}
    </>
  );
};