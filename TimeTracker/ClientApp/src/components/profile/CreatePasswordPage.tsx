import React, { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { CreatePasswordForm } from './CreatePasswordForm';
import login from '../../content/images/login.jpg';
import { useSearchParams } from 'react-router-dom';

export const CreatePasswordPage = () => {
  const [urlParams] = useSearchParams();
  const token = urlParams.get('token');

  return (
    <>
      <div className='container-fluid vh-100'>
        <Row className='h-100'>
          <Col className='my-auto'>
            <Image className='login-image' src={login} />
          </Col>
          <Col className='my-auto'>
            <div className='login-page-content mx-auto'>
              {token && <CreatePasswordForm token={token} />}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
