import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../behavior/store';
import { Tabs } from './Tabs';

export const Layout = () => {
  const { user } = useSelector((state: RootState) => state.userDetails);

  return (
    <>
      <div className='page'>
        {user && <h1 className='mb-3'>{user.name} {user.surname}</h1>}
        <Tabs userId={user?.id} />
      </div>
      <Outlet />
    </>
  );
};
