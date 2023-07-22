import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
      <Container className='top-panel'>
        <div className="text-end">
          <Row>
            <Col>
              <span className="header-name">Hi, {userInfo?.name}</span>
            </Col>
            <Col>
              <button className="btn btn-primary w-30" type="submit" onClick={handleLogoutButtonClick}>Log out</button>
            </Col>
          </Row>
        </div>
      </Container>
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
