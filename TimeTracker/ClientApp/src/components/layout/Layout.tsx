import React, { useEffect } from 'react';
import { Button, Col, Container, NavLink, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { requestAuthentication } from '../../behavior/profile';
import { routes } from '../../behavior/routing';
import { RootState } from '../../behavior/store';
import { Navigation } from './Navigation';
import { logout } from '../../behavior/profile/actions';

export const Layout = () => {
  const dispatch = useDispatch();
  const { authenticated, userInfo } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (authenticated == null)
      dispatch(requestAuthentication());
  }, [dispatch, authenticated]);

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  if (authenticated == null)
    return null;

  if (authenticated === false)
    return (<Navigate to={routes.login} />);

  return (
    <>
      <div className="text-end top-panel">
        <Container className='display-flex flex-row top-panel-container align-items-center'>
          <span className="header-name align-middle ">Hi, {userInfo?.name}</span>
          <Button variant="link" onClick={handleLogoutButtonClick}>Logout</Button>
        </Container>
      </div>
      <div className="container">
        <div className="row">
          <Navigation />
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
