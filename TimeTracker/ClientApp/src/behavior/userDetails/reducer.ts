import { createReducer } from '@reduxjs/toolkit';
import type { User } from '../users/types';

import {
  USER_RECEIVED, UserReceivedAction,
  USER_UPDATED, UpdatedUserReceivedAction
} from './actions';

export type userCreationState = {
  user: User | null,
};

const initialState: userCreationState = {
  user: null,
};

export default createReducer(initialState, {
  [USER_RECEIVED]: onUserReceived,
  [USER_UPDATED]: onUserUpdateReceived,
});

function onUserReceived(state: userCreationState, action: UserReceivedAction): userCreationState {
  const user = action.payload.user;
  return {...state, user};
}

function onUserUpdateReceived(state: userCreationState, action: UpdatedUserReceivedAction): userCreationState {
  const user = action.payload.userUpdate;
  return {...state, user};
}
