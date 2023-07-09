import React, { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { requestAuthentication, requestFirstUserExistence } from '../../behavior/profile/actions';
import { routes } from '../../behavior/routing';
import { RootState } from '../../behavior/store';
import { FirstUserForm } from './FirstUserForm';
import { LoginForm } from './LoginForm';
import login from '../../content/images/login.jpg';

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
    return (<Navigate to={routes.users.list} />);

  return (
    <>
      <div className='container-fluid vh-100'>
        <Row className='h-100'>
          <Col className='my-auto'>
            <Image className='login-image' src={login} />
          </Col>
          <Col className='my-auto'>
            <div className='login-page-content mx-auto'>
              {firstUserExists ? <LoginForm /> : <FirstUserForm />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
