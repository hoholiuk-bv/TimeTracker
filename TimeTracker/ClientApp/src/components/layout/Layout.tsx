import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const Layout = () => {
  const token = localStorage.getItem('auth-token');

  return (
    <>
      {token ? <Navigate to="/users" /> : <Navigate to="/login" />}
      <Outlet/>
    </>
  );
};