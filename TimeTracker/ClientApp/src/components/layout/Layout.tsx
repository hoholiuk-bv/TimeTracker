import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { requestAuthentication } from '../../behavior/profile';
import { routes } from '../../behavior/routing';
import { RootState } from '../../behavior/store';
import { Navigation } from './Navigation';

export const Layout = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (authenticated == null)
      dispatch(requestAuthentication());
  }, [dispatch, authenticated]);

  if (authenticated == null)
    return null;

  if (authenticated === false)
    return (<Navigate to={routes.login} />);

  return (
    <>
      <Container className='top-panel'>
        <Row className='align-items-center justify-content-end'>
          <Col></Col>
        </Row>
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
