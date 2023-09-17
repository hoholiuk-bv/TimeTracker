import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../behavior/profile/actions';

export const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const handleSuccessLogin = (token: string | undefined) => {
    dispatch(googleLogin(token));
  };
  return (
    <>
      <GoogleOAuthProvider clientId="883802315963-knqiobamdno06qilt1rrpp3djg9s70c2.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            handleSuccessLogin(credentialResponse.credential);
          }}
          onError={() => {
            <div className='alert alert-danger'>Username or password is invalid</div>;
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};