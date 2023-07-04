import {createReducer} from '@reduxjs/toolkit';
import type {User} from './types';
import {
  USER_LIST_RECEIVED,
  SEARCHED_USERS_RECEIVED,
  UserListReceivedAction,
  SearchedUsersReceivedAction,
} from './actions';

export type UsersState = {
  list: User[];
  totalUsersCount: number;
};

const initialState: UsersState = {
  list: [],
  totalUsersCount: 0,
};

export default createReducer(initialState, {
  [USER_LIST_RECEIVED]: onUsersReceived,
  [SEARCHED_USERS_RECEIVED]: onSearchedUsersReceived,
});

function onUsersReceived(state: UsersState, action: UserListReceivedAction): UsersState {
  const list = action.payload.userList;
  const totalUsersCount = action.payload.totalUsersCount;
  return {...state, list, totalUsersCount};
}

function onSearchedUsersReceived(state: UsersState, action: SearchedUsersReceivedAction): UsersState {
  const list = action.payload.userList;
  return {...state, list};
}
