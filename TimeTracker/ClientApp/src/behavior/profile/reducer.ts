import { createReducer } from '@reduxjs/toolkit';
import { default as Cookie } from 'js-cookie';
import {
  AuthenticateAction,
  FirstUserExistenceReceiveAction,
  LoginReceiveAction,
  LogoutAction,
  FIRST_USER_EXISTENCE_RECEIVED,
  LOGIN_RECIEVED,
  USER_AUTHENTICATED,
  LOGOUT
} from './actions';
import type { UserInfo } from './types';

export type ProfileState = {
  firstUserExists: boolean | null,
  loginFailed: boolean,
  authenticated: boolean | null,
  userInfo: UserInfo | null,
};

const initialState: ProfileState = {
  firstUserExists: null,
  loginFailed: false,
  userInfo: null,
  authenticated: null,
};

export default createReducer(initialState, {
  [FIRST_USER_EXISTENCE_RECEIVED]: onUserExistenceReceived,
  [USER_AUTHENTICATED]: onUserAuthenticated,
  [LOGIN_RECIEVED]: onLoginReceived,
  [LOGOUT]: onLogout
});

function onLoginReceived(state: ProfileState, action: LoginReceiveAction) {
  const { loginFailed } = action.payload;

  return { ...state, loginFailed };
}

function onUserExistenceReceived(state: ProfileState, action: FirstUserExistenceReceiveAction) {
  const { firstUserExists } = action.payload;

  return { ...state, firstUserExists };
}

function onUserAuthenticated(state: ProfileState, action: AuthenticateAction) {
  const { userInfo, token } = action.payload;

  if (token) {
    // localStorage.setItem('auth-token', token);
    Cookie.set('auth-token', token);
  }
  else {
    // localStorage.removeItem('auth-token');
    Cookie.remove('auth-token');
  }

  return { ...state, userInfo, authenticated: userInfo != null };
}

function onLogout(state: ProfileState, action: LogoutAction) {
  localStorage.removeItem('auth-token');
  Cookie.remove('auth-token');
  return { ...state, authenticated: null, userInfo: null };
}
