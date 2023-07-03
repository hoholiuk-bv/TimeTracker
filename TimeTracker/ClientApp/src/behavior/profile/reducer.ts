import { createReducer } from '@reduxjs/toolkit';
import { AuthenticateAction, FirstUserExistenceReceiveAction, FIRST_USER_EXISTENCE_RECEIVED, USER_AUTHENTICATED } from './actions';
import type { User } from './types';

export type ProfileState = {
  firstUserExists: boolean,
  user: User | null,
};

const initialState: ProfileState = {
  firstUserExists: false,
  user: null
};

export default createReducer(initialState, {
  [FIRST_USER_EXISTENCE_RECEIVED]: onUserExistenceReceived,
  [USER_AUTHENTICATED]: onUserAuthenticated,
});

function onUserExistenceReceived(state: ProfileState, action: FirstUserExistenceReceiveAction) {
  const { firstUserExists } = action.payload;

  return { ...state, firstUserExists };
}

function onUserAuthenticated(state: ProfileState, action: AuthenticateAction) {
  const { user } = action.payload;
  if (user?.token)
    localStorage.setItem('auth-token', user.token);
  return { ...state, user };
}