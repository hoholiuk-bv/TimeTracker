import { createReducer } from '@reduxjs/toolkit';
import type { User } from './types';
import {
  UsersReceivedAction,
  USER_LIST_RECEIVED,
} from './actions';

export type UsersState = { 
  users: User[]; 
};

const initialState: UsersState = {
  users: [],
};

export default createReducer(initialState, {
  [USER_LIST_RECEIVED]: onUsersReceived,
});

function onUsersReceived(state: UsersState, action: UsersReceivedAction) {
  const { users } = action.payload;

  return { ...state, users };
}