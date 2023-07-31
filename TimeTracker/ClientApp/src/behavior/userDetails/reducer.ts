import { createReducer } from '@reduxjs/toolkit';
import type { User } from '../users/types';
import type { ApproverInfo } from '../userCreation/types';
import {
  USER_RECEIVED, UserReceivedAction,
  APPROVERS_RECEIVED, ApproversReceivedAction,
  USER_UPDATED, UpdatedUserReceivedAction
} from './actions';

export type userCreationState = {
  user: User | null,
  approvers: ApproverInfo[],
};

const initialState: userCreationState = {
  user: null,
  approvers: [],
};

export default createReducer(initialState, {
  [USER_RECEIVED]: onUserReceived,
  [APPROVERS_RECEIVED]: onApproversReceived,
  [USER_UPDATED]: onUserUpdateReceived,
});

function onUserReceived(state: userCreationState, action: UserReceivedAction): userCreationState {
  const user = action.payload.user;
  return {...state, user};
}

function onApproversReceived(state: userCreationState, action: ApproversReceivedAction): userCreationState {
  const approvers = action.payload.approverList;
  return {...state, approvers};
}

function onUserUpdateReceived(state: userCreationState, action: UpdatedUserReceivedAction): userCreationState {
  const user = action.payload.userUpdate;
  return {...state, user};
}
