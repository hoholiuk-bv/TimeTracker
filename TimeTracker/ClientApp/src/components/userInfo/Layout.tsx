import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { RootState } from '../../behavior/store';
import { receiveUser, requestUser } from '../../behavior/userDetails/actions';
import { Tabs } from './Tabs';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';

export const Layout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userDetails);
  const { id } = useParams();

  useEffect(() => {
    if (user && user.id !== id)
      dispatch(receiveUser(null));
  }, [dispatch, user, id]);

  useEffect(() => {
    if (!user)
      dispatch(requestUser(id!));
  }, [dispatch, user, id]);

  if (user === undefined)
    return null;

  if (user === null)
    return (
      <div className='page'>
        <Alert variant='secondary'>{'User not found.'}</Alert>
      </div>);


  return (
    <>
      <div className='page'>
        <h1 className='mb-3'>{user.name} {user.surname}</h1>
        <Tabs userId={user?.id} />
      </div>
      <Outlet />
    </>
  );
};
