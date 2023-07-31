import {createReducer} from '@reduxjs/toolkit';
import type {ApproverInfo} from './types';
import {
  SHORT_USER_LIST_RECEIVED, UserListReceivedAction,
} from './actions';

export type userCreationState = {
  list: ApproverInfo[];
};

const initialState: userCreationState = {
  list: [],
};

export default createReducer(initialState, {
  [SHORT_USER_LIST_RECEIVED]: onUsersReceived
});

function onUsersReceived(state: userCreationState, action: UserListReceivedAction): userCreationState {
  const list = action.payload.userList;
  return {...state, list};
}
