import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
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
          <span className="header-name align-middle ">Hi, <Link to={routes.userCabinet} className="btn-link">{userInfo?.name}</Link></span>
          <Button variant="link" onClick={handleLogoutButtonClick}>Logout</Button>
        </Container>
      </div>
      <Container>
        <Row>
          <Navigation />
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};
