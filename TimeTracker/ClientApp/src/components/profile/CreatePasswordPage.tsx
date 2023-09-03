import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { CreatePasswordForm } from './CreatePasswordForm';
import login from '../../content/images/login.jpg';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../behavior/store';
import { routes } from '../../behavior/routing';

export const CreatePasswordPage = () => {
  const [urlParams] = useSearchParams();
  const token = urlParams.get('token');
  const { authenticated, loginFailed } = useSelector((state: RootState) => state.profile);

  if (authenticated)
    return (<Navigate to={routes.worktime} />);

  const tokenInvalid = !token || loginFailed;
  return (
    <>
      <div className='container-fluid vh-100'>
        <Row className='h-100'>
          <Col className='my-auto'>
            <Image className='login-image' src={login} />
          </Col>
          <Col className='my-auto'>
            <div className='login-page-content mx-auto'>
              {tokenInvalid ? <h1>Sorry, the action you are trying to do is currently unavailable</h1> : <CreatePasswordForm token={token} />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
